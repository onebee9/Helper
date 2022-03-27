/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/login", (req, res) => {
    const id = req.session.user_id;
    if (id) {
      res.redirect("/users/profile");
    } else {
      res.render("login");
    }
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const queryString = `SELECT * FROM users
                          WHERE email = $1 AND password = $2;`;

    db.query(queryString, [email, password])
      .then((data) => {
        if (data.rows[0]) {
          req.session.user_id = data.rows[0].id;
          req.session.name = data.rows[0].first_name;
          req.session.fullName = data.rows[0].first_name + " " + data.rows[0].last_name;
          req.session.email = data.rows[0].email;
          res.status(200).json(
            {
              "status": "success",
              "message": "user logged in successfully",
              "data": {
                id: data.rows[0].id,
                first_name: data.rows[0].first_name,
                last_name: data.rows[0].last_name,
                email: data.rows[0].email,
                created_at: data.rows[0].created_at,
                isserviceprovider: data.rows[0].isserviceprovider
              }

            }
          );
        } else {
          res.status(400).json(
            {
              "status": "error",
              "message": "You must enter a valid username and password"
            }
          );
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/profile/:id", (req, res) => {

    const id = req.params.id;
    const personalData = `SELECT * FROM users WHERE id = $1;`
    const bookings = `SELECT * FROM service_bookings WHERE users_id = $1;`
    const address = `SELECT * FROM locations WHERE user_id = $1;`
    const availability = `SELECT * FROM availabilities WHERE users_id = $1;`
    const services = `SELECT * FROM services WHERE user_id = $1;`

    const results = {};

    Promise.all([

      db.query(personalData, [id]),
      db.query(bookings, [id]),
      db.query(address, [id]),
      db.query(availability, [id]),
      db.query(services, [id]),

    ]).then((result) => {
      res.json({
        personalData: result[0].rows,
        bookings: result[1].rows,
        address: result[2].rows,
        availability: result[3].rows,
        services: result[4].rows
      })
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(
          {
            status: 'failed',
            error: err.message
          });
      });

  });


  // DELETE /api/users/logout
  router.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  })

  return router;
};

