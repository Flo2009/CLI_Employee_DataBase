DROP DATABASE IF EXISTS hr_db;
CREATE DATABASE hr_db;

\c hr_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE role_table (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role_table(id)
    ON DELETE SET NULL
);