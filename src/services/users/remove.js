const { User } = require('../../models');

/**
 * Remove an user by its Id.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - User Id. Required.
 * @return {Promise} - Promise value: Removed user.
 */
module.exports = id => {
    return User.findByPk(id).then(user => {
        if (!user) {
            return Promise.reject({
                status: 404,
                message: 'There is no user with the `id` provided.'
            });
        }

        return user.destroy();
    });
};
