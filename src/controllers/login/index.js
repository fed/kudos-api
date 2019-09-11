const get = require('lodash/get');
const authenticate = require('../../services/login');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: POST
 * Endpoint: <ROOT_URL>/login
 *
 * @param {string} request.body.email
 * @param {string} request.body.password
 */
module.exports = (request, response) => {
    const { email, password } = request.body;

    authenticate(email, password)
        .then(token => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: {
                    token
                }
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
