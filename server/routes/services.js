/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Get all services provided on the platform, for use outside the search page if needed.
  router.get('/', (req, res) => {
    let query = `SELECT * FROM services WHERE services.id IS NOT NULL ;`;
    db.query(query)
      .then((data) => {
        const services = data.rows;
        res.json({ services });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //create new services
  router.post('/new', (req, res) => {
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
        res.json({ service });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //update service
  router.put('/update/:id', (req, res) => {
    const queryParams = [];
    const id = req.params.id;
    const { title, category, description, fee } = req.body;
    let columns = [];
    let values = [];

    //Check what the user would like to update and add on to the query
    if (!title == '') {
      queryParams.push(title);
      columns.push('title');
      values.push(title);
      //queryString += `title = $${multipleOrNot(title)} `;
    }

    if (!category == '') {
      queryParams.push(category);
      columns.push('category');
      values.push(category);
   
    }

    if (!fee == '') {
      let feeToNumber = parseInt(fee);
      queryParams.push(feeToNumber);
      columns.push('fee');
      values.push(feeToNumber);
    }

    if (!description == '') {
      queryParams.push(description);
      columns.push('description');
      values.push(description);
    }

    let params = [id];
    let query = 'UPDATE users SET ';
    for (let i = 0; i < columns.length; i++) {

      query += query + ' ' + columns[i] + ' = ' + params.length + 1;
      params.push(queryParams[columns[i]]);
    }

    query = query.substring(0, query.length - 1) + ' WHERE id = $1';


    db.query(query, params)
      .then((data) => {
        res.json('successfully updated');
      })
      .catch((error) => console.log(error));
  });

  //Return all services from database, uses filters when provided
  router.get('/search', (req, res) => {
    const queryParams = [];
    const { keyword, category, price, location } = req.query;
    console.log(req.query);

    let queryString = `SELECT services.*, users.first_name
    FROM services
    JOIN Users ON users.id = services.user_id
    JOIN locations ON users.id = locations.user_id
    WHERE services.id IS NOT NULL `;

    //validate that search params exist and then add on to the query
    if (!keyword == '') {
      queryParams.push(`%${keyword}%`);
      queryString += `AND services.description ILIKE $${queryParams.length} `;
    }

    if (!category == '') {
      queryParams.push(category);
      queryString += `AND services.category = $${queryParams.length} `;
    }

    if (!price == '') {
      let priceToNumber = parseInt(price);
      queryParams.push(priceToNumber);
      queryString += `AND services.fee <= $${queryParams.length} `;
    }

    if (!location == '') {
      queryParams.push(location);
      queryString += `AND locations.Metropolitan = $${queryParams.length} `;
    }

    queryString += `;`;

    console.log(queryString);
    console.log(queryParams);

    db.query(queryString, queryParams)
      .then((data) => {
        if (data) {
          const searchResults = data.rows;

          res.json(searchResults);
          return;
        }
        res.json('No matching search results');
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
          queryData: queryString,
        });
      });
  });

  router.get('/averageRating/:id', (req, res) => {
    const serviceId = req.params.id;
    const queryString = `SELECT avg(rating) FROM service_bookings WHERE id = $1`;

    db.query(queryString, [serviceId])
      .then((data) => {
        const rating = data.rows;
        res.json(rating[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  //Delete a service
  router.delete('/remove/:id', (req, res) => {
    const serviceId = Number(req.params.id);
    const queryString = `DELETE FROM services WHERE id = $1;`;

    db.query(queryString, [serviceId])
      .then((data) => {
        if (data.rows.length > 0) {
          res.status(200).json('success');
        } else {
          res.status(500).send('Account not found.');
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get all services a provider offers
  router.get('/provider/:id', (req, res) => {
    const serviceProviderID = req.params.id;
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

  //Get all data for a specific service
  router.get('/:id', (req, res) => {
    const serviceProviderID = req.params.id;
    let query = `SELECT * FROM services where id = $1;`;

    db.query(query, [serviceProviderID])
      .then((data) => {
        const services = data.rows;
        if (services.length == 0) {
          res.status(404).json({ error: 'Not Found' });
          return;
        }
        res.json(services[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
