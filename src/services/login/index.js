const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { hash } = require('../../utils/helpers');
const { secret } = require('../../utils/config');

/**
 * Authenticate user based on the provided email and password.
 * Note that services must always return a promise.
 * Reject the promise if credentials are incorrect or the user doesn't exist.
 *
 * @param {string} email - Email address. Required.
 * @param {string} password - Password. Required.
 * @return {Promise} - Promise value: Authentication token.
 */
module.exports = (email, password) => {
    if (!email) {
        return Promise.reject({
            status: 401,
            message: 'Please enter your email.'
        });
    }

    if (!password) {
        return Promise.reject({
            status: 401,
            message: 'Please enter your password.'
        });
    }

    return User.findOne({
        where: { email }
    }).then(user => {
        if (!user || user.password !== hash(password)) {
            return Promise.reject({
                status: 401,
                message: 'Invalid credentials.'
            });
        }

        // The token can include some payload data. In this case we send the current user details.
        const claims = {
            user: {
                id: user.id,
                email,
                firstName: user.first_name,
                lastName: user.last_name,
                imageUrl: user.image_url,
                isAdmin: user.is_admin
            }
        };

        // Set token to expire in 96 hours.
        const expiration = {
            expiresIn: 1440 * 96
        };

        // Create and return token iff user is found and password is right.
        const token = jwt.sign(claims, secret, expiration);

        return Promise.resolve(token);
    });
};
