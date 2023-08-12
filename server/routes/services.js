/*
 * All routes for services are defined here
and are mounted onto /services in server.js
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //GET /api/services
  //Get all services provided on the platform, for use outside the search page if needed.
  router.get("/", async (req, res) => {
    try {
      const query = `SELECT * FROM services WHERE services.id IS NOT NULL ;`;
      const allServiceData = await db.query(query);
      const services = allServiceData.rows;

      if (services) {
        res.status(200).json({ services });
      } else {
        res.status(404).json({ error: "No services found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //POST /api/services
  router.post("/", async (req, res) => {
    const query = `INSERT INTO services( user_id, title, description, category, fee) 
      VALUES ($1,$2,$3,$4,$5) RETURNING *;`;

    const values = [
      req.session.user_id,
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.fee,
    ];

    try {
      const data = await db.query(query, values);
      const service = data.rows;
      if (service) {
        res.status(200).json({ service });
      } else {
        res.status(404).json({ error: "Service creation failed" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/search", async (req, res) => {
    const queryParams = [];
    const { keyword, category, price, location } = req.query;

    let query = `SELECT services.*, users.first_name
    FROM services
    JOIN Users ON users.id = services.user_id
    JOIN locations ON users.id = locations.user_id
    WHERE services.id IS NOT NULL `;

    //validate that search params exist and then add on to the query
    if (!keyword == "") {
      queryParams.push(`%${keyword}%`);
      query += `AND services.description ILIKE $${queryParams.length} `;
    }

    if (!category == "") {
      queryParams.push(category);
      query += `AND services.category = $${queryParams.length} `;
    }

    if (!price == "") {
      let priceToNumber = parseInt(price);
      queryParams.push(priceToNumber);
      query += `AND services.fee <= $${queryParams.length} `;
    }

    if (!location == "") {
      queryParams.push(location);
      query += `AND locations.Metropolitan = $${queryParams.length} `;
    }

    query += `;`;

    try {
      const data = await db.query(query, queryParams);
      const searchResults = data.rows;

      if (searchResults) {
        res.status(200).json(searchResults);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (err) {
      res.status(500).json({
        error: err.message,
        queryData: queryString,
      });
    }
  });

  //GET /api/services/:id
  router.get("/:id", async (req, res) => {
    const serviceId = req.params.id;
    const query = `SELECT * FROM services where id = $1;`;

    try {
      const data = await db.query(query, [serviceId]);
      const serviceData = data.rows;
      if (serviceData) {
        res.status(200).json(serviceData[0]);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT /api/services/:id
  router.put("/:id", async (req, res) => {
    const queryParams = [];
    const id = req.params.id;
    const { title, category, description, fee } = req.body;
    let columns = [];
    let values = [];

    //Check what the user would like to update and add on to the query
    if (!title == "") {
      queryParams.push(title);
      columns.push("title");
      values.push(title);
      //queryString += `title = $${multipleOrNot(title)} `;
    }

    if (!category == "") {
      queryParams.push(category);
      columns.push("category");
      values.push(category);
    }

    if (!fee == "") {
      let feeToNumber = parseInt(fee);
      queryParams.push(feeToNumber);
      columns.push("fee");
      values.push(feeToNumber);
    }

    if (!description == "") {
      queryParams.push(description);
      columns.push("description");
      values.push(description);
    }

    let params = [id];
    let query = "UPDATE users SET ";
    for (let i = 0; i < columns.length; i++) {
      query += query + " " + columns[i] + " = " + params.length + 1;
      params.push(queryParams[columns[i]]);
    }

    query = query.substring(0, query.length - 1) + " WHERE id = $1";

    try {
      await db.query(query, [...params, ...queryParams]);
      res.status(200).json({ message: "Service successfully updated" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to update service", details: err.message });
    }
  });

  //Delete a service
  router.delete("/:id", async (req, res) => {
    const serviceId = Number(req.params.id);
    const query = `DELETE FROM services WHERE id = $1;`;
    try {
      const data = await db.query(query, [serviceId]);
      if (data.rows.length > 0) {
        res.status(200).json("success");
      } else {
        res.status(404).send("failed.");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
