CREATE DATABASE users_app
USE users_app

CREATE TABLE users (
    id INTEGER PRIMARY KEY, 
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    age INTEGER NOT NULL,
    password_hashed VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIME NOT NULL
)