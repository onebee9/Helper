DROP TABLE IF EXISTS availabilities CASCADE;
CREATE TABLE availabilities(
    id SERIAL PRIMARY KEY NOT NULL,
    start_time int,
    end_time int,
    created_at TIMESTAMPTZ DEFAULT Now() ,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);