const get = require('lodash/get');
const create = require('../../services/users/create');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: POST
 * Endpoint: <ROOT_URL>/users
 * This is a protected route.
 *
 * @param {string} request.body.email
 * @param {string} request.body.password
 * @param {string} request.body.first_name
 * @param {string} request.body.last_name
 * @param {string} request.body.image_url
 * @param {boolean} request.body.is_admin
 */
module.exports = (request, response) => {
    const { email, password, first_name, last_name, image_url, is_admin } = request.body;

    create(email, password, first_name, last_name, image_url, is_admin)
        .then(user => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: user
            });
        })
        .catch(error => {
            const status = get(error, 'status', 500);
            const message = get(error, 'message', SERVER_ERROR);

            response.status(status).send({
                meta: {
                    status,
                    message: ERROR
                },
                error: {
                    message
                }
            });
        });
};
