const get = require('lodash/get');
const remove = require('../../services/stars/remove');
const { getTokenFromRequest, getPayloadFromToken } = require('../../utils/helpers');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: DELETE
 * Endpoint: <ROOT_URL>/stars/:id
 * This is a protected route.
 *
 * @param {number} request.params.id
 */
module.exports = (request, response) => {
    const starId = request.params.id;
    const token = getTokenFromRequest(request);
    const decoded = getPayloadFromToken(token);
    const userId = get(decoded, 'user.id');
    const isAdmin = get(decoded, 'user.isAdmin');

    remove(starId, userId, isAdmin)
        .then(star => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: star
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
