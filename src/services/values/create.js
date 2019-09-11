const { Value } = require('../../models');

/**
 * Create a new value.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {string} name - Value name. Required.
 * @param {string} description - Value description. Required.
 * @param {string} imageUrl - Value image URL. Required.
 * @param {string} slackLogo - Value Slack logo. Required.
 * @return {Promise} - Promise value: Created value.
 */
module.exports = (name, description, imageUrl, slackLogo) => {
    if (!name) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid `name`.'
        });
    }

    if (!description) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid `description`.'
        });
    }

    if (!imageUrl) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a valid `image_url`.'
        });
    }

    if (!slackLogo) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a valid `slack_logo`.'
        });
    }

    return Value.create({
        name,
        description,
        image_url: imageUrl,
        slack_logo: slackLogo
    });
};
