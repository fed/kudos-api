const get = require('lodash/get');
const getByValue = require('../../services/ranking/getByValue');
const { SUCCESS, ERROR, SERVER_ERROR } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/ranking/value/:value_id
 *
 * @param {number} request.params.value_id
 */
module.exports = (request, response) => {
    const id = request.params.value_id;

    getByValue(id)
        .then(ranking => {
            const status = 200;

            response.status(status).send({
                meta: {
                    status,
                    message: SUCCESS
                },
                data: ranking
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
