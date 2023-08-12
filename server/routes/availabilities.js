/*
 * All routes for availabilities are defined here
and are mounted onto /availability in server.js
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/availabilities/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const query = `SELECT availabilities.* FROM availabilities where user_id = $1;`;

    try {
      const availabilityData = await db.query(query, [userId]);
      const availability = availabilityData.rows;

      if (availability) {
        res.status(200).json(availability);
      } else {
        res.status(404).json({ error: "No availability found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/availabilities", async (req, res) => {
    const query = `INSERT INTO availabilities(start_time,end_time) VALUES ($1,$2) RETURNING *;`;
    const values = [req.body.start_time, req.body.end_time, req.body.id];
    try {
      const availabilityData = await db.query(query, values);
      const availability = availabilityData.rows;

      if (availability) {
        res.status(200).json(availability);
      } else {
        res.status(400).json({ error: "Availability creation failed" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
