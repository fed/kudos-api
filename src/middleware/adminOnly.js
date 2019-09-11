const get = require('lodash/get');
const { AUTH_ERROR, AUTH_INSUFFICIENT_PERMISSIONS } = require('../utils/messages');
const { getTokenFromRequest, getPayloadFromToken } = require('../utils/helpers.js');

// Middleware that protects sensitive routes from non administrators.
module.exports = (request, response, next) => {
    const token = getTokenFromRequest(request);
    const decoded = getPayloadFromToken(token);
    const isAdmin = get(decoded, 'user.is_admin');

    if (!isAdmin) {
        const status = 401; // Unauthorized

        return response.status(status).send({
            meta: {
                status,
                message: AUTH_ERROR
            },
            error: {
                message: AUTH_INSUFFICIENT_PERMISSIONS
            }
        });
    }

    next();
};
