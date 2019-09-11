const { User } = require('../../models');
const { hash } = require('../../utils/helpers');

/**
 * Update an existing user's password.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {string} password - User password. Required.
 * @return {Promise} - Promise value: Updated user.
 */
module.exports = (id, currentPassword, newPassword) => {
    if (!currentPassword) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a `current_password`.'
        });
    }

    if (!newPassword) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a `new_password`.'
        });
    }

    return User.findByPk(id).then(user => {
        if (!user) {
            return Promise.reject({
                status: 404,
                message: 'The user you are trying to update does not exist.'
            });
        }

        // Reject if the current password is incorrect.
        if (hash(currentPassword) !== user.password) {
            return Promise.reject({
                status: 401,
                message: 'Your current password is incorrect.'
            });
        }

        return user
            .update({
                password: hash(newPassword)
            })
            .then(user => user.parse());
    });
};
