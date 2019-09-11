const get = require('lodash/get');
const getProfileDetails = require('../../services/me/getProfileDetails');
const { getUserIdFromToken } = require('../../utils/helpers');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/me
 */
module.exports = (request, response) => {
    const id = getUserIdFromToken(request);

    getProfileDetails(id)
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
