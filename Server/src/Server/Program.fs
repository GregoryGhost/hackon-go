module Server.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Giraffe
open Dapper
open Npgsql
open System.Linq

// ---------------------------------
// Models
// ---------------------------------

type Message =
    {
        Text : string
    }

[<CLIMutable>]
type TestUser =
    {
        Id : int
        Name : string
        Age : int
    }
    
[<CLIMutable>]
type Tasks =
    {
        Name : string
        Description : string
        Task_latitude : double
        Task_longitude : double
        Payment : double
    }
    

let getTasks cityName =
    let connection = new NpgsqlConnection("Host=localhost;Username=gregory;Password=root;Database=gregory")
    connection.Open()
    let query = sprintf "SELECT t.name, t.description, m1.task_latitude, m1.task_longitude, t.payment \
     FROM tasks t INNER JOIN \
      (SELECT id_task, task_latitude, task_longitude \
        FROM mapTasks m INNER JOIN cities c \
            ON c.name = '%s') as m1 \
      ON t.id_task = m1.id_task;" cityName
    let value = connection.Query<Tasks>(query)
    connection.Close()
    let tasks = value.ToList()
    tasks

let getFirstUser =
    let firstUser = 
        lazy (
            let connection = new NpgsqlConnection("Host=localhost;Username=gregory;Password=root;Database=gregory")
            connection.Open()
            let value = connection.Query<TestUser>("SELECT * FROM test;")
            connection.Close()
            let user = value.First()
            sprintf "%d %s %d" user.Id user.Name user.Age
        )
    firstUser.Value

let getUsers =
    let users =
        lazy (
            let connection = new NpgsqlConnection("Host=localhost;Username=gregory;Password=root;Database=gregory")
            connection.Open()
            let value = connection.Query<TestUser>("SELECT * FROM test;")
            connection.Close()
            let user = value.ToList()
            user
        )
    users.Value

let submitTasks : HttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let cityName = "Томск"
            cityName |> getTasks |> ctx.WriteJsonAsync |> ignore
            
            return! next ctx
        }

let submitUsers : HttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            ctx.WriteJsonAsync getUsers |> ignore
            // Sends the object back to the client
            return! next ctx
        }

// ---------------------------------
// Views
// ---------------------------------

module Views =
    open GiraffeViewEngine

    let layout (content: XmlNode list) =
        html [] [
            head [] [
                title []  [ encodedText "Server" ]
                link [ _rel  "stylesheet"
                       _type "text/css"
                       _href "/main.css" ]
            ]
            body [] content
        ]

    let partial () =
        h1 [] [ encodedText "Server" ]

    let index (model : Message) =
        [
            partial()
            p [] [ encodedText model.Text ]
        ] |> layout

// ---------------------------------
// Web app
// ---------------------------------

let indexHandler (name : string) =
    let greetings = sprintf "Hello %s, from Giraffe!" name
    let model     = { Text = greetings }
    let view      = Views.index model
    htmlView view

let indexShowFirstUser (name : string) =
    indexHandler <| name

let webApp =
    choose [
        GET >=>
            choose [
                route "/" >=> indexHandler "world"
                routef "/hello/%s" indexHandler
                route "/show-first-user/" >=> indexShowFirstUser getFirstUser
                route "/show-users1/" >=> negotiate getUsers

                //отправляем клиенту обратно список заданий в формате JSON
                route "/tasks/" >=> submitTasks
            ]
        setStatusCode 404 >=> text "Not Found" ]

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins("http://localhost:8080")
           .AllowAnyMethod()
           .AllowAnyHeader()
           |> ignore

let configureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IHostingEnvironment>()
    (match env.IsDevelopment() with
    | true  -> app.UseDeveloperExceptionPage()
    | false -> app.UseGiraffeErrorHandler errorHandler)
        .UseCors(configureCors)
        .UseStaticFiles()
        .UseGiraffe(webApp)

let configureServices (services : IServiceCollection) =
    services.AddCors()    |> ignore
    services.AddGiraffe() |> ignore

let configureLogging (builder : ILoggingBuilder) =
    let filter (l : LogLevel) = l.Equals LogLevel.Error
    builder.AddFilter(filter).AddConsole().AddDebug() |> ignore

[<EntryPoint>]
let main _ =
    let contentRoot = Directory.GetCurrentDirectory()
    let webRoot     = Path.Combine(contentRoot, "WebRoot")
    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .UseIISIntegration()
        .UseWebRoot(webRoot)
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices)
        .ConfigureLogging(configureLogging)
        .Build()
        .Run()
    0