DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    category VARCHAR(255),
    description VARCHAR(255),
    fee INT,
    created_at TIMESTAMPTZ DEFAULT Now(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE

);