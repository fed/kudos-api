const { Value } = require('../../models');

/**
 * Update an existing value.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {number} id - Value Id. Required.
 * @param {string} name - Value name. Required.
 * @param {string} description - Value description. Required.
 * @param {string} imageUrl - Value image URL. Required.
 * @param {string} slackLogo - Value Slack logo. Required.
 * @return {Promise} - Promise value: Updated value.
 */
module.exports = (id, name, description, imageUrl, slackLogo) => {
    if (!name) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid new `name`.'
        });
    }

    if (!description) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid new `description`.'
        });
    }

    if (!imageUrl) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a valid new `image_url`.'
        });
    }

    if (!slackLogo) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a valid new `slack_logo`.'
        });
    }

    return Value.findByPk(id).then(value => {
        if (!value) {
            return Promise.reject({
                status: 404,
                message: 'The value you are trying to update does not exist.'
            });
        }

        return value.update({
            name,
            description,
            image_url: imageUrl,
            slack_logo: slackLogo
        });
    });
};
