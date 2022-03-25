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
    let query = `SELECT * FROM services WHERE services.id IS NOT NULL ;`;
    db.query(query)
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

  router.get("/:id", (req, res) => {

    const serviceProviderID = req.params.id;
    let query = `SELECT * FROM services WHERE id = $1 ;`;

    db.query(query,[serviceProviderID])
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
  
  
  router.get("/search", (req, res) => {
    const queryParams = [];
    const{keyword,category,price,location} = req.query;//read up on this

    let queryString = `SELECT services.*, users.first_name
    FROM services
    JOIN Users ON users.id = services.user_id
    JOIN availabilities ON users.id = availabilities.users_id
    JOIN locations ON users.id = locations.user_id
    WHERE services.id IS NOT NULL `;

    //validate that search queries exist and then add on to the query
    if (!keyword == "") {
      queryParams.push(`%${keyword}%`);
      queryString += `AND services.title LIKE $${queryParams.length} `;
    }

    if (!category == "") {
      queryParams.push(category);
      queryString += `AND services.category = $${queryParams.length} `;
    }

    if (!price == "") {
      let priceToNumber = parseInt(price);
      queryParams.push(priceToNumber) ;
      queryString += `AND services.fee <= $${queryParams.length} `;
    }

    if (!location == "") {
      queryParams.push(location );
      queryString += `AND locations.Metropolitan = $${queryParams.length} `;
    }

    // if (!date == "") {
    //   queryParams.push(date);
    //   queryString += `AND $${queryParams.length} BETWEEN availabilities.start_time AND availabilities.end_time `;
    // }
   
    queryString += `GROUP BY services.id, users.first_name ;`;

    db.query(queryString, queryParams)
      .then((data) => {
        if (data) {
          const searchResults = data.rows;
          // res.status(200).json(
          //   {
          //     "status": "success",
          //     "message": "user logged in successfully",
          //     "data": {
          //       id: data.rows[0].id,
          //       first_name: data.rows[0].first_name,
          //       last_name: data.rows[0].last_name,
          //       email: data.rows[0].email,
          //       created_at: data.rows[0].created_at,
          //       isserviceprovider: data.rows[0].isserviceprovider
          //     }

          //   }
          // );
          res.json({ searchResults });
          //res.json({queryString});
          return;
        }
        res.json("No matching search results");
      })
      .catch((err) => {
        res.json({queryString});
        //res.status(500).json({ error: err.message });
      });
  });

  router.delete("/remove", (req, res) => {
    const userID = req.query.id;

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