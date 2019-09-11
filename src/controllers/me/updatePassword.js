const get = require('lodash/get');
const updatePassword = require('../../services/me/updatePassword');
const { getUserIdFromRequest } = require('../../utils/helpers');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: PUT
 * Endpoint: <ROOT_URL>/me/password
 * This is a protected route.
 *
 * @param {string} request.body.current_password
 * @param {string} request.body.new_password
 */
module.exports = (request, response) => {
    const id = getUserIdFromRequest(request);
    const { current_password, new_password } = request.body;

    updatePassword(id, current_password, new_password)
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
