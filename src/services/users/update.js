const { User } = require('../../models');
const { hash } = require('../../utils/helpers');

/**
 * Update an existing user.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {string} email - User email. Required.
 * @param {string} password - User password. Required.
 * @param {string} firstName - User first name. Required.
 * @param {string} lastName - User last name. Required.
 * @param {string} imageUrl - Profile picture URL. Optional.
 * @param {boolean} isAdmin - Admin privileges. Optional.
 * @return {Promise} - Promise value: Updated user.
 */
module.exports = (id, email, password, firstName, lastName, imageUrl, isAdmin = false) => {
    if (!email) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide an `email`.'
        });
    }

    if (!password) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a `password`.'
        });
    }

    if (!firstName) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a `first_name`.'
        });
    }

    if (!lastName) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a `last_name`.'
        });
    }

    return User.findByPk(id).then(user => {
        if (!user) {
            return Promise.reject({
                status: 404,
                message: 'The user you are trying to update does not exist.'
            });
        }

        return user
            .update({
                email,
                password: hash(password),
                first_name: firstName,
                last_name: lastName,
                image_url: imageUrl,
                is_admin: isAdmin
            })
            .then(user => user.parse());
    });
};
