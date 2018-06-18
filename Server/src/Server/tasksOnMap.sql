CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

CREATE TABLE mapTasks (
    id_cities SERIAL REFERENCES cities(id),
    id_task SERIAL REFERENCES tasks(id),
    task_latitude real NOT NULL,
    task_longitude real NOT NULL,
    UNIQUE (id_cities, id_task),
    UNIQUE (task_latitude, task_longitude)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    description varchar(150) NOT NULL UNIQUE,
);
