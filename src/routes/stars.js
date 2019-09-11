const express = require('express');
const router = express.Router();

// Middleware.
const protect = require('../middleware/protect');

// Controllers.
const create = require('../controllers/stars/create');
const getAll = require('../controllers/stars/getAll');
const getByValue = require('../controllers/stars/getByValue');
const getByUser = require('../controllers/stars/getByUser');
const remove = require('../controllers/stars/remove');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.post('/', protect, create);
router.get('/', protect, getAll);
router.get('/value/:value_id', protect, getByValue);
router.get('/user/:user_id', protect, getByUser);
router.delete('/:id', protect, remove);

module.exports = router;
