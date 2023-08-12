/*
 * All routes for Users are defined here
and are mounted onto /users in server.js
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //POST/api/users/login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = $1 AND password = $2;`;

    try {
      const { rows } = await db.query(query, [email, password]);

      if (rows.length > 0) {
        const { id, first_name, last_name, isserviceprovider } = rows[0];

        return res.status(200).json({
          status: "success",
          message: "user logged in successfully",
          data: {
            id,
            first_name,
            last_name,
            email,
            created_at: rows[0].created_at,
            isserviceprovider,
          },
        });
      }
      res.status(400).json("You must enter a valid username and password");
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  //GET /api/users
  router.get("/", async (req, res) => {
    try {
      const query = `SELECT * FROM users WHERE users.id IS NOT NULL ;`;
      const userData = await db.query(query);
      const users = userData.rows;
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json("No services found");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  //GET /api/users/:id
  router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const personalDataQuery = `SELECT * FROM users WHERE id = $1;`;
    const bookingsQuery = `SELECT * FROM service_bookings WHERE users_id = $1;`;
    const addressQuery = `SELECT * FROM locations WHERE user_id = $1;`;
    const availabilityQuery = `SELECT * FROM availabilities WHERE users_id = $1;`;
    const servicesQuery = `SELECT * FROM services WHERE user_id = $1;`;

    try {
      const [
        { rows: personalData },
        { rows: bookings },
        { rows: address },
        { rows: availability },
        { rows: services },
      ] = await Promise.all([
        db.query(personalDataQuery, [id]),
        db.query(bookingsQuery, [id]),
        db.query(addressQuery, [id]),
        db.query(availabilityQuery, [id]),
        db.query(servicesQuery, [id]),
      ]);

      res.status(200).json({
        personalData,
        bookings,
        address,
        availability,
        services,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //GET /api/users/:id/services
  router.get("/:id/services", (req, res) => {
    const serviceProviderID = req.params.id;
    console.log(serviceProviderID);
    let query = `SELECT * FROM services where user_id = $1;`;

    db.query(query, [serviceProviderID])
      .then((data) => {
        const services = data.rows;
        res.json(services);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET /api/users/:id/client-bookings
  router.get("/:id/client-bookings", async (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM service_bookings WHERE users_id = $1;";

    try {
      const data = await db.query(query, [userId]);
      const bookingData = data.rows;

      if (bookingData) {
        res.status(200).json(bookingData);
      } else {
        res.status(404).json("No bookings found for this user");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //GET /api/users/:id/service-bookings
  router.get("/:id/service-bookings", async (req, res) => {
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

    try {
      const data = await db.query(queryString, [serviceID]);
      const serviceBookings = data.rows;
      if (serviceBookings) {
        res.status(200).json(serviceBookings);
      } else {
        res.status(404).json("No bookings found for this user");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE /api/users/logout
  router.delete("/logout", (req, res) => {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          err
            ? res.status(400).send("Unable to log out")
            : res.send("Logout successful");
        });
      } else {
        res.end();
      }
    } catch (err) {
      res.status(500).send("Server error");
    }
  });

  return router;
};
