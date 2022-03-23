/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  
  router.get("/availabilities", (req, res) => {

    const userId = req.session.user_id;
    db.query(`SELECT availabilities.* FROM availabilities where user_id = $1;`,[userId])
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/availabilities", (req, res) => {

    const queryString = `INSERT INTO 
    availabilities(start_time,end_time)
    VALUES ($1,$2) where user_id=$3 RETURNING *;`;

    const values = [
      req.body.start_time,
      req.body.end_time,
      req.session.userId
    ];
    
    db.query(queryString,values)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
