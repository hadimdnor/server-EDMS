CREATE DATABASE employee_management;
\c employee_management

CREATE TABLE users(id SERIAL PRIMARY KEY, username TEXT, email TEXT, password_digest TEXT);

CREATE TABLE employees(id SERIAL PRIMARY KEY, name TEXT, staff_id INTEGER, age INTEGER,email TEXT, position TEXT,department TEXT, wage INTEGER);