/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    let query = `SELECT * FROM services WHERE services.user_id = $1 ;`;
    db.query(query,[userId])
      .then(data => {
        const services = data.rows;
        res.json({ services });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/search", (req, res) => {
    const queryParams = [];
    const{keyword, category, location, price, date} = req.body;

    let queryString = `SELECT services.*, users.name 
    FROM services
    JOIN Users ON users.id = services.user_ID
    JOIN availabilities ON users.id = availabilities.userID
    WHERE services.id IS NOT NULL`;

    //validate that search queries exist and then add on to the query
    if (!keyword == "") {
      queryParams.push(`%${keyword}%`);
      queryString += ` AND services.description LIKE $${queryParams.length} `;
    }

    if (!category == "") {
      queryParams.push(category);
      queryString += `AND services.category = $${queryParams.length} `;
    }

    if (!price == "") {
      queryParams.push(price) ;
      queryString += `AND services.fee = $${queryParams.length} `;
    }

    if (!location == "") {
      queryParams.push(location );
      queryString += `AND services.Metropolitan = $${queryParams.length} `;
    }

    if (!date == "") {
      queryParams.push(date);
      queryString += `AND $${queryParams.length} BETWEEN availabilities.start_time AND availabilities.end_time `;
    }
   
    queryString += `GROUP BY services.id, users.name ;`;

    db.query(queryString, queryParams)
      .then((data) => {
        if (data) {
          const searchResults = data.rows;
          res.json({ searchResults });
          return;
        }
        res.json("No matching search results");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {
    const userID = req.session.user_id;
    const queryString = `DELETE FROM services 
      WHERE user_id = $1 AND services_id = $2;`;

    const values = [userID, req.body.serviceID];
    db.query(queryString, values)
      .then((data) => {
        if (data.rows.length > 0) {
          res.status(200).json('success');
        } else {
          res.status(202).json('failed');
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/new", (req, res) => {
    const userID = req.session.user_id;
    const queryString = `INSERT INTO services(
      user_id,
      title,
      description,
      category,
      fee) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;

    const values = [
      userID,
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.fee,
    ];

    db.query(queryString, values)
      .then((data) => {
        const service = data.rows;
        res.json({ service});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  return router;
};