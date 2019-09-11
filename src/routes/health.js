const express = require('express');
const router = express.Router();

// Controllers.
const health = require('../controllers/health');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.get('/', health);

module.exports = router;
