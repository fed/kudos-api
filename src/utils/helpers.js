const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const moment = require('moment');
const { md5, sha1 } = require('hash-util');
const { Op } = require('sequelize');
const { secret } = require('./config.json');

function getCurrentEnvironment() {
    return process.env.NODE_ENV || 'development';
}

function hash(password) {
    return md5(sha1(password));
}

function getTokenFromRequest(request) {
    if (
        !request.headers.authorization ||
        request.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        return;
    }

    // The authorization header format is: "Bearer eyJhbGciOiJIUzI1NiIsInR5..."
    return request.headers.authorization.split(' ')[1];
}

function getPayloadFromToken(token) {
    return jwt.verify(token, secret);
}

function getUserIdFromRequest(request) {
    const token = getTokenFromRequest(request);
    const decoded = getPayloadFromToken(token);

    return get(decoded, 'user.id');
}

function getDateFilter(from, to) {
    const dateFilter = {};

    // We only filter by period if both a start and end date are provided.
    if (from && to) {
        const utcFrom = moment.utc(from).format();
        const utcTo = moment.utc(to).format();

        dateFilter.where = {
            created_at: {
                [Op.gte]: utcFrom,
                [Op.lte]: utcTo
            }
        };
    }

    return dateFilter;
}

module.exports = {
    getCurrentEnvironment,
    hash,
    getTokenFromRequest,
    getPayloadFromToken,
    getUserIdFromRequest,
    getDateFilter
};
