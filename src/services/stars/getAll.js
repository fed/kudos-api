const { User, Value, Star } = require('../../models');
const { getDateFilter } = require('../../utils/helpers');

/**
 * Retrieve all stars ever given.
 * Note that services must always return a promise.
 *
 * @param {Date} from - Start date expressed according to ISO 8601. Optional.
 * @param {Date} to - End date expressed according to ISO 8601. Optional.
 * @return {Promise} - Promise value: Array of stars.
 */
module.exports = (from, to) => {
    const dateFilter = getDateFilter(from, to);
    const options = Object.assign(
        {
            order: [['id', 'DESC']],
            include: [
                { model: User, as: 'Sender' },
                { model: User, as: 'Receiver' },
                { model: Value }
            ]
        },
        dateFilter
    );

    return Star.findAll(options).then(stars => stars.map(star => star.parse()));
};
