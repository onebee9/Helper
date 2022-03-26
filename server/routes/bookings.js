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
  router.post("/new", (req, res) => {
    console.log(req.body);
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
      req.body.start,
      req.body.end
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

  //update service booking
  router.put("/bookings/:id", (req, res) => {
    const { title, rating, status } = req.params;

    db.query(
      `
  INSERT INTO service_booking (title, rating, status) VALUES ($1::text, $2::integer, $3::text)
  WHERE id = $4::integer
`,
      [title, rating, status, Number(req.params.id)]
    )
      .then((data) => {
        res.json('successfully updated');
      })
      .catch(error => console.log(error));
  });

  router.get("/provider/:id", (req, res) => {
    const serviceID = req.params.id

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
    WHERE U2.id = $1`


    db.query(queryString, [serviceID])
      .then(data => {
        const allBookings = data.rows;
        res.json({clientBookings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

   //retrieve service booking
  router.get("/:id", (req, res) => {
    const userID = req.params.id

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
    WHERE U1.id = $1`


    db.query(queryString, [userID])
      .then(data => {
        const appointments = data.rows;
        res.json({ serviceBookings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
