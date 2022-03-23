/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/services", (req, res) => {
    const userId = req.session.user_id;
    let query = `SELECT services.* FROM services WHERE services.user_id = $1 ;`;
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

    console.log(req.body.category);
    console.log(req.body.title);

    let queryString = `SELECT services.*, users.name FROM resources JOIN Users ON users.id =
      resources.user_id WHERE resources.id IS NOT NULL `;

    //validate that search queries exist and then add on to the query
    if (!req.body.title == "") {
      queryParams.push(`%${req.body.title}%`);
      queryString += ` AND resources.title LIKE $${queryParams.length} `;
    }

    if (!req.body.category == "") {
      queryParams.push(req.body.category);
      queryString += `AND resources.category = $${queryParams.length} `;
    }
    queryString += `GROUP BY resources.id, users.name ;`;

    db.query(queryString, queryParams)
      .then((data) => {
        if (data) {
          const resources = data.rows;
          res.render("resources", { resources });
          return;
        }
        res.send("No matching search results");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};





 const allServices =``