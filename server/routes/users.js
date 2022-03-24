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
        console.log("console", data.rows)
        if (data.rows[0]) {
          console.log(data.rows);
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
      .catch ((err) => {
  res.status(500).json({ error: err.message });
});
  });

router.get("/profile", (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    res.redirect("/login");
    return;
  }

  const allUserData = `SELECT appointments.*, users.first_name, users.last_name, users.email
    FROM appointments
    LEFT JOIN users ON appointments.user_id = users.id
    WHERE appointments.user_id = $1`;

  const allServices = `SELECT services.*
    FROM services
    WHERE services.user_id = $1;`

  let results = {};
  db.query(allUserData, [userId])
    .then((userData) => {
      results['userData'] = userData.rows;
    })
    .then(() => {
      db.query(allServices, [userId])
        .then((serviceData) => {
          results['serviceData'] = serviceData.rows;
          console.log(results);
          console.log(userId);
          res.json(results);
        })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

});

router.get("/logout", (req, res) => {
  req.session = null;
  res.clearCookie("user_id");
  res.redirect("/users/login");
});

return router;
};

