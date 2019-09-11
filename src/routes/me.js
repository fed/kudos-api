const express = require('express');
const router = express.Router();

// Middleware.
const protect = require('../middleware/protect');

// Controllers.
const getProfileDetails = require('../controllers/me/getProfileDetails');
const updatePassword = require('../controllers/me/updatePassword');
const updateProfileDetails = require('../controllers/me/updateProfileDetails');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.get('/', protect, getProfileDetails);
router.put('/password', protect, updatePassword);
router.put('/', protect, updateProfileDetails);

module.exports = router;
