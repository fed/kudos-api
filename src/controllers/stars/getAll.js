const get = require('lodash/get');
const getAll = require('../../services/stars/getAll');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/stars?from=:from&to=:to
 * This is a protected route.
 *
 * @param {Date} request.query.from
 * @param {Date} request.query.to
 */
module.exports = (request, response) => {
    const { from, to } = request.query;

    getAll(from, to)
        .then(stars => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: stars
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
