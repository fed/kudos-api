const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Secret for generating tokens
const { secret } = require('./utils/config');

// Route Handlers
const health = require('./routes/health');
const login = require('./routes/login');
const me = require('./routes/me');
const values = require('./routes/values');
const users = require('./routes/users');
const stars = require('./routes/stars');
const ranking = require('./routes/ranking');

// Instantiate Express app
const app = express();

// App settings
app.set('port', process.env.PORT || 8080);
app.set('secret', secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Enable pre-flight requests across all routes.
// Must be included before other routes.
app.options('*', cors());

// Bind prefixed routes to handlers.
app.use('/', health);
app.use('/login', login);
app.use('/me', me);
app.use('/values', values);
app.use('/users', users);
app.use('/stars', stars);
app.use('/ranking', ranking);

module.exports = app;
