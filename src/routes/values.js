const express = require('express');
const router = express.Router();

// Middleware.
const protect = require('../middleware/protect');
const adminOnly = require('../middleware/adminOnly');

// Controllers.
const create = require('../controllers/values/create');
const getAll = require('../controllers/values/getAll');
const remove = require('../controllers/values/remove');
const update = require('../controllers/values/update');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.post('/', [protect, adminOnly], create);
router.get('/', protect, getAll);
router.delete('/:id', [protect, adminOnly], remove);
router.put('/:id', [protect, adminOnly], update);

module.exports = router;
