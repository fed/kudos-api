const { Star } = require('../../models');

/**
 * Removes a star by its Id.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - Star Id. Required.
 * @return {Promise} - Promise value: Removed star.
 */
module.exports = (starId, userId, isAdmin) => {
    return Star.findByPk(starId).then(star => {
        if (!star) {
            return Promise.reject({
                status: 404,
                message: 'There is no star with the `id` provided.'
            });
        }

        // You can only remove a star you've sent yourself.
        // Administrators can remove all stars.
        if (star.sender_id !== userId || !isAdmin) {
            return Promise.reject({
                status: 401,
                message: `You can't remove a star you haven't sent yourself.`
            });
        }

        return star.destroy();
    });
};
