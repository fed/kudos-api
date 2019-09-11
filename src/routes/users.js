const express = require('express');
const router = express.Router();

// Middleware.
const protect = require('../middleware/protect');
const adminOnly = require('../middleware/adminOnly');

// Controllers.
const create = require('../controllers/users/create');
const getAll = require('../controllers/users/getAll');
const getById = require('../controllers/users/getById');
const remove = require('../controllers/users/remove');
const update = require('../controllers/users/update');

// Attach all of the routes to the router.
// Here we bind an HTTP verb, a route, a controller and optionally any number of middlewares.
router.post('/', [protect, adminOnly], create);
router.get('/', protect, getAll);
router.get('/:id', protect, getById);
router.delete('/:id', [protect, adminOnly], remove);
router.put('/:id', [protect, adminOnly], update);

module.exports = router;
