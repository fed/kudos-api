const express = require('express');
const router = express.Router();

// Controllers.
const login = require('../controllers/login');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.post('/', login);

module.exports = router;
