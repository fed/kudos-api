const get = require('lodash/get');
const getByUser = require('../../services/stars/getByUser');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/stars/user/:user_id?from=:from&to=:to
 * This is a protected route.
 *
 * @param {number} request.params.user_id
 * @param {Date} request.query.from
 * @param {Date} request.query.to
 */
module.exports = (request, response) => {
    const id = request.params.user_id;
    const { from, to } = request.query;

    getByUser(id, from, to)
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
