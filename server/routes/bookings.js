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

  router.get("/provider/:serviceID", (req, res) => {
    const serviceID = req.params.id
    console.log(serviceID);

    const queryString = `SELECT service_bookings.*, locations.*, users.first_name, users.email
    FROM service_bookings
    JOIN users ON service_bookings.users_id = users.id
    JOIN locations ON users.id = locations.user_id
    WHERE service_bookings.services_id = $1`;


    db.query(queryString, [serviceID])
      .then(data => {
        const allBookings = data.rows;
        res.json({allBookings });
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

    db.query(`SELECT * FROM service_bookings where users_id = $1;`, [userID])
      .then(data => {
        const appointments = data.rows;
        res.json({ appointments });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
