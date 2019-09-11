const get = require('lodash/get');
const update = require('../../services/users/update');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: PUT
 * Endpoint: <ROOT_URL>/users/:id
 * This is a protected route.
 *
 * @param {number} request.params.id
 * @param {string} request.body.email
 * @param {string} request.body.password
 * @param {string} request.body.first_name
 * @param {string} request.body.last_name
 * @param {string} request.body.image_url
 */
module.exports = (request, response) => {
    const id = request.params.id;
    const { email, password, first_name, last_name, image_url } = request.body;

    update(id, email, password, first_name, last_name, image_url)
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
