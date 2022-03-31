/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //create service booking
  router.post('/new', (req, res) => {
    const queryString = `INSERT INTO service_bookings(
      users_id,
      title,
      services_id,
      status,
      st_date,
      end_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;

    const values = [
      req.body.id,
      req.body.title,
      req.body.services_id,
      req.body.status,
      req.body.start, // 9AM
      req.body.end,
    ];

    db.query(queryString, values)
      .then((data) => {
        const newBooking = data.rows;
        res.json({ newBooking });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/ratings', async (req, res) => {

    const { bookingId, rating } = req.body;
    const params = [parseInt(rating), parseInt(bookingId, 10)];
    const query = "UPDATE service_bookings SET rating = $1 where id = $2";

    db.query(query, params)
      .then((data) => {
        res.json('successfully updated')
      })
      .catch(error => console.log(error));
  });


  //update service booking
  router.put('/update/:id', (req, res) => {
    const { title, rating, status } = req.params;

    db.query(
      `
  UPDATE service_bookings 
  SET title = $1, rating = $2, status = $3
  WHERE id = $4::integer
`,
      [title, rating, status, Number(req.params.id)]
    )
      .then((data) => {
        res.json('successfully updated');
      })
      .catch((error) => console.log(error));
  });


  router.get('/ratings/:id', (req, res) => {
    const bookingId = req.params.id;
    const queryString = `SELECT rating FROM service_bookings WHERE id = $1`;

    db.query(queryString, [bookingId])
      .then((data) => {
        const rating = data.rows;
        res.json(rating[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //retrive service booking
  router.get('/provider/:id', (req, res) => {
    const serviceID = req.params.id;

    const queryString = `SELECT
    S1.id as booking_id,  S1.rating, S1.status, S1.created_at, S1. st_date as start_time, S1.end_date as end_time,
    U1.id as client_id, U1.first_name as client_first_name, U1.last_name as client_last_name, U1.email as client_email,
    S2.id as services_id, S2.title, S2.category, S2.description, S2.fee,
    U2.first_name as provider_first_name, U2.email as provider_email_address,U2.id as provider_id,
    CONCAT(L.num, ' ', L.street,', ', L.Metropolitan, ', ', L.city, ',', L.postal_code) as address
    FROM
    service_bookings S1
    LEFT JOIN users U1 ON S1.users_id = U1.id
    LEFT JOIN services S2 ON S1.services_id = S2.id
    LEFT JOIN users U2 ON S2.user_id = U2.id
    LEFT JOIN locations L ON L.user_id = U1.id
    WHERE U2.id = $1`;

    db.query(queryString, [serviceID])
      .then((data) => {
        const serviceBookings = data.rows;
        res.json(serviceBookings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //retrieve client bookings
  router.get('/:id', (req, res) => {
    const userID = req.params.id;

    //filter by date as well when you have more dates.
    const queryString = `SELECT
    S1.id as booking_id,  S1.rating, S1.status, S1.created_at, S1. st_date as start_time, S1.end_date as end_time,
    U1.id as client_id, U1.first_name as client_first_name, U1.last_name as client_last_name, U1.email as client_email,
    S2.id as services_id, S2.title, S2.category, S2.description, S2.fee,
    U2.first_name as provider_first_name, U2.email as provider_email_address,
    CONCAT(L.num, ' ', L.street,', ', L.Metropolitan, ', ', L.city, ',', L.postal_code) as address
    FROM
    service_bookings S1
    LEFT JOIN users U1 ON S1.users_id = U1.id
    LEFT JOIN services S2 ON S1.services_id = S2.id
    LEFT JOIN users U2 ON S2.user_id = U2.id
    LEFT JOIN locations L ON L.user_id = U1.id
    WHERE U1.id = $1`;

    db.query(queryString, [userID])
      .then((data) => {
        const clientBookings = data.rows;
        res.json(clientBookings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
