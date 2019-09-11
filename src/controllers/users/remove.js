const get = require('lodash/get');
const remove = require('../../services/users/remove');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: DELETE
 * Endpoint: <ROOT_URL>/users/:id
 * This is a protected route.
 *
 * @param {number} request.params.id
 */
module.exports = (request, response) => {
    const id = request.params.id;

    remove(id)
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
