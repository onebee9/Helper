DROP TABLE IF EXISTS service_bookings CASCADE;
CREATE TABLE service_bookings(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    rating INT,
    status VARCHAR(255) false,
    created_at TIMESTAMPTZ DEFAULT Now() ,
    st_date timestamptz,
    end_date timestamptz,
    accepted_at TIMESTAMPTZ DEFAULT NULL,
    rejected_at TIMESTAMPTZ DEFAULT NULL,
    finished_at TIMESTAMPTZ DEFAULT NULL,
    services_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE

);