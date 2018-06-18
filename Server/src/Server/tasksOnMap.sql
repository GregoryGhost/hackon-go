CREATE TABLE cities (
    id_city SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

CREATE TABLE mapTasks (
    id_cities SERIAL REFERENCES cities(id_city),
    id_task SERIAL REFERENCES tasks(id_task),
    task_latitude real NOT NULL,
    task_longitude real NOT NULL,
    UNIQUE (id_cities, id_task),
    UNIQUE (task_latitude, task_longitude)
);

CREATE TABLE tasks (
    id_task SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    description varchar(150) NOT NULL UNIQUE,
    payment real NOT NULL
);
