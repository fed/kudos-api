const first = require('lodash/first');
const { sequelize, Value } = require('../../models');

/**
 * Retrieve the ranking by value.
 * This returns a list of the users sorted by number of stars for a given value.
 * Note that services must always return a promise.
 *
 * @return {Promise} - Promise value: Array of users.
 */
module.exports = id =>
    Value.findByPk(id).then(value => {
        if (!value) {
            return Promise.reject({
                status: 404,
                message: 'The value you are trying to get the ranking for does not exist.'
            });
        }

        const rankingQuery = `SELECT u.email, u.first_name, u.last_name, u.image_url, COUNT(s.id)
            FROM users u
            JOIN stars s ON s.receiver_id = u.id
            WHERE s.value_id = ${id}
            GROUP BY u.email, u.first_name, u.last_name, u.image_url
            ORDER BY COUNT(s.id) DESC;`;

        return sequelize.query(rankingQuery).then(response => first(response));
    });
