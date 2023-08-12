/*
 * All routes for bookings are defined here
and are mounted onto /booking in server.js
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //create service booking
  router.post("/", async (req, res) => {
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

    try {
      const data = await db.query(query, values);
      const booking = data.rows;
      if (booking) {
        res.status(200).json({ booking });
      } else {
        res.status(400).json({ error: "Booking creation failed" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //PUT /api/:id
  router.put("/:id", async (req, res) => {
    const { title, rating, status } = req.params;
    const query = ` UPDATE service_bookings  SET title = $1, rating = $2, status = $3 WHERE id = $4::integer`;
    const values = [title, rating, status, Number(req.params.id)];

    try {
      await db.query(query, values);
      res.json("successfully updated");
    } catch (err) {
      res.status(400).json({ error: "Update failed." });
    }
  });

  router.put("/ratings", async (req, res) => {
    const { bookingId, rating } = req.body;
    const params = [parseInt(rating), parseInt(bookingId, 10)];
    const query = "UPDATE service_bookings SET rating = $1 where id = $2";

    db.query(query, params)
      .then((data) => {
        res.json("successfully updated");
      })
      .catch((error) => console.log(error));
  });

  router.get("/ratings/:id", (req, res) => {
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
  return router;
};
