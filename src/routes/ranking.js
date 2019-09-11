const express = require('express');
const router = express.Router();

// Middleware.
const protect = require('../middleware/protect');

// Controllers.
const getByValue = require('../controllers/ranking/getByValue');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.get('/value/:value_id', protect, getByValue);

module.exports = router;
