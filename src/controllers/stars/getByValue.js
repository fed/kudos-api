const get = require('lodash/get');
const getByValue = require('../../services/stars/getByValue');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/stars/value/:value_id?from=:from&to=:to
 * This is a protected route.
 *
 * @param {number} request.params.value_id
 * @param {Date} request.query.from
 * @param {Date} request.query.to
 */
module.exports = (request, response) => {
    const id = request.params.value_id;
    const { from, to } = request.query;

    getByValue(id, from, to)
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
