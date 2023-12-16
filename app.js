// configuring environvenment variables
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const sanitizeRequestData = require('./middlewares/sanitize-request-data');

const database = require('./utilities/database');

const userRouter = require('./routes/user');

const app = express();

// Sets required headers
app.use(helmet());

// Allow cors origin requests
app.use(cors());

// Parsing request body JSON data
app.use(bodyParser.json());

// Sanitizing incoming data for security threats using custom defined middleware
app.use(sanitizeRequestData);

// Route for user
app.use('/user', userRouter);

// if request does not matches any route 404 response sent
app.use('/', (req, res) => res.status(404).send({ message: 'Path not found' }));

// Creating connection with the database & listen on port for requests
database
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    throw err;
  });