DROP TABLE IF EXISTS locations CASCADE;
CREATE TABLE locations(
    id SERIAL PRIMARY KEY NOT NULL,
    num INT,
    street VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(255),
    country VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    created_at TIMESTAMPTZ DEFAULT Now() ,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);