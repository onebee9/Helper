DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) ,
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255) ,
    created_at TIMESTAMPTZ DEFAULT Now() ,
    account_type ENUM ('client','service provider') DEFAULT 'client'
);