const get = require('lodash/get');
const update = require('../../services/values/update');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: PUT
 * Endpoint: <ROOT_URL>/values/:id
 * This is a protected route.
 *
 * @param {number} request.params.id
 * @param {string} request.body.name
 * @param {string} request.body.description
 * @param {string} request.body.image_url
 * @param {string} request.body.slack_logo
 */
module.exports = (request, response) => {
    const id = request.params.id;
    const { name, description, image_url, slack_logo } = request.body;

    update(id, name, description, image_url, slack_logo)
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
