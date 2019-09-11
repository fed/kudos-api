const { User } = require('../../models');

/**
 * Retrieve all users.
 * Note that services must always return a promise.
 *
 * @return {Promise} - Promise value: Array of parsed users.
 */
module.exports = () =>
    User.findAll({
        order: [['first_name', 'ASC']]
    }).then(users => users.map(user => user.parse()));
