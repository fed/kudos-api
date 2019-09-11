const assignDeep = require('assign-deep');
const { User, Value, Star } = require('../../models');
const { getDateFilter } = require('../../utils/helpers');

/**
 * Retrieve all stars for a particular value.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - Value Id. Required.
 * @param {Date} from - Start date expressed according to ISO 8601. Optional.
 * @param {Date} to - End date expressed according to ISO 8601. Optional.
 * @return {Promise} - Promise value: Stars for a particular value.
 */
module.exports = (id, from, to) => {
    return Value.findByPk(id).then(value => {
        if (!value) {
            return Promise.reject({
                status: 404,
                message: 'The requested value does not exist.'
            });
        }

        const dateFilter = getDateFilter(from, to);

        // We need to use assignDeep as `Object.assign` works shallowly,
        // e.g. the object returned by `dateFilter` will overwrite the `where` object in the first argument.
        const options = assignDeep(
            {
                include: [
                    { model: User, as: 'Sender' },
                    { model: User, as: 'Receiver' },
                    { model: Value }
                ],
                where: {
                    value_id: id
                }
            },
            dateFilter
        );

        return Star.findAll(options).then(stars => stars.map(star => star.parse()));
    });
};
