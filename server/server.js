// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51IVeTDI0afQjVTUZlmKqi484beUHQ7VAX05eoME17pMqm1Lur3fMPJ3OP5q1271pEeTJyiP1DNL06zoIC7XMbOyI009ef70myJ');
const qs = require('qs');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(cors({ credentials: true, origin: 'http://localhost:8000' }));
// app.use((req, res, next) => {     res.append('Access-Control-Allow-Credentials', true);     res.append('Access-Control-Allow-Origin', ['*']);    next(); });
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1'],
  })
);

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static('public'));

// Separated Routes for each Resource
const usersRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const bookingsRoutes = require('./routes/bookings');
const availabilitiesRoutes = require('./routes/availabilities');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/api/users', usersRoutes(db));
app.use('/api/services', serviceRoutes(db));
app.use('/api/bookings', bookingsRoutes(db));
app.use('/api/availabilities', availabilitiesRoutes(db));
// Note: mount other resources here, using the same pattern above

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/payment', async (req, res) => {
  const { name,unit_amount,link,bookingId} = req.body;
  console.log('req body', req.body);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name : name,
          },
          unit_amount : unit_amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    
    //Happends booking and redirect data on success
    success_url: `http://localhost:8080/paidBooking?bookingId=${bookingId}&redirectUrl=${link}`,
    cancel_url: link
  });

  console.log("SESSION:\n",session);
  console.log("RESULT:\n",res);
  
  res.json(session.url);
});

//Handles updating the booking when the payment is successful
app.get('/paidBooking', async (req, res) => {

  const {bookingId,redirectUrl } = req.query;
  console.log(req.params);
  const bookingPaymentStatus = 'paid';

    const params = [bookingPaymentStatus,parseInt(bookingId,10)];
    const query = "UPDATE service_bookings SET status = $1 where id = $2";

    db.query(query, params)
      .then((data) => {
        res.redirect(redirectUrl);
      })
      .catch(error => console.log(error));
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
