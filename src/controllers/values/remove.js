const get = require('lodash/get');
const remove = require('../../services/values/remove');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: DELETE
 * Endpoint: <ROOT_URL>/values/:id
 * This is a protected route.
 *
 * @param {number} request.params.id
 */
module.exports = (request, response) => {
    const id = request.params.id;

    remove(id)
        .then(value => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: value
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
