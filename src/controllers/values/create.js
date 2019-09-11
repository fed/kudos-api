const get = require('lodash/get');
const create = require('../../services/values/create');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: POST
 * Endpoint: <ROOT_URL>/values
 * This is a protected route.
 *
 * @param {string} request.body.name
 * @param {string} request.body.description
 * @param {string} request.body.image_url
 * @param {string} request.body.slack_logo
 */
module.exports = (request, response) => {
    const { name, description, image_url, slack_logo } = request.body;

    create(name, description, image_url, slack_logo)
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
