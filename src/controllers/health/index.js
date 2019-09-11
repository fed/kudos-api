const { name, version } = require('../../../package');
const { getCurrentEnvironment } = require('../../utils/helpers');
const { SUCCESS } = require('../../utils/messages');

/**
 * Method: GET
 * Endpoint: <ROOT_URL>/
 */
module.exports = (request, response) => {
    const status = 200;

    response.status(status).send({
        meta: {
            status,
            message: SUCCESS
        },
        data: {
            name,
            version,
            environment: getCurrentEnvironment()
        }
    });
};
