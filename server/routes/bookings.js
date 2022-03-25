/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session.userID;
    db.query(`SELECT * FROM service_bookings where user_id = $1;`,[userID] )
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

  router.post("/new", (req, res) => {
    const queryString = `INSERT INTO service_bookings(
      user_id,
      title,
      services_id,
      status,
      st_date,
      end_date) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;

    const values = [
      req.session.user_id,
      req.body.title,
      req.body.services_id,
      'pending',
      req.body.start,
      req.body.end
    ];

    db.query(queryString, values)
      .then((data) => {
        const newBooking = data.rows;
        res.json({ newBooking});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


router.get("/bookings/:id", (req, res) => {

const {title,rating,status} = request.body.booking;

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
  return router;
};
