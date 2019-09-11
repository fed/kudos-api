const get = require('lodash/get');
const create = require('../../services/stars/create');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: POST
 * Endpoint: <ROOT_URL>/stars
 * This is a protected route.
 *
 * @param {number} request.body.sender_id
 * @param {number} request.body.receiver_id
 * @param {number} request.body.value_id
 * @param {string} request.body.comment
 * @param {boolean} request.body.is_anonymous
 */
module.exports = (request, response) => {
    const { sender_id, receiver_id, value_id, comment, is_anonymous } = request.body;

    create(sender_id, receiver_id, value_id, comment, is_anonymous)
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
