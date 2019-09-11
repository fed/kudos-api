const { User } = require('../../models');

/**
 * Retrieve a particular user.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - User Id. Required.
 * @return {Promise} - Promise value: Parsed user.
 */
module.exports = id =>
    User.findByPk(id).then(user => {
        if (!user) {
            return Promise.reject({
                status: 404,
                message: 'The requested user does not exist.'
            });
        }

        return user.parse();
    });
