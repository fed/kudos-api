const { Value } = require('../../models');

/**
 * Removes a value by its Id.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - Value Id. Required.
 * @return {Promise} - Promise value: Removed value.
 */
module.exports = id =>
    Value.findByPk(id).then(value => {
        if (!value) {
            return Promise.reject({
                status: 404,
                message: 'There is no value with the `id` provided.'
            });
        }

        return value.destroy();
    });
