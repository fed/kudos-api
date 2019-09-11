const { Value } = require('../../models');

/**
 * Retrieve all values.
 * Note that services must always return a promise.
 *
 * @return {Promise} - Promise value: Array of values.
 */
module.exports = () =>
    Value.findAll({
        order: [['id', 'ASC']]
    });
