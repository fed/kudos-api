const axios = require('axios');
const { Star, User, Value } = require('../../models');

// Posting to this URL will send a message to the #kudos Slack channel.
const SLACK_URL = 'https://hooks.slack.com/services/x/y/z';

/**
 * Create a new star.
 * Note that services must always return a promise.
 * Reject the promise if any required value is missing.
 *
 * @param {string} senderId - Sender user Id. Required.
 * @param {string} receiverId - Receiver user Id. Required.
 * @param {string} valueId - Value Id. Required.
 * @param {string} comment - Comments. Optional.
 * @param {boolean} isAnonymous - Flag indicating whether the star was sent anonymously. Optional.
 * @return {Promise} - Promise value: Created star.
 */
module.exports = (senderId, receiverId, valueId, comment, isAnonymous = false) => {
    if (!senderId) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid `sender_id`.'
        });
    }

    if (!receiverId) {
        return Promise.reject({
            status: 400,
            message: 'Please make sure to provide a valid `receiver_id`.'
        });
    }

    if (!valueId) {
        return Promise.reject({
            status: 400,
            message: 'Plase make sure to provide a valid `value_id`.'
        });
    }

    // We don't want people giving stars to themselves.
    if (senderId === receiverId) {
        return Promise.reject({
            status: 412,
            message: 'You cannot send stars to yourself!'
        });
    }

    // Slack integration: Post a message to the Slack channel.
    const senderPromise = User.findByPk(senderId);
    const receiverPromise = User.findByPk(receiverId);
    const valuePromise = Value.findByPk(valueId);

    Promise.all([senderPromise, receiverPromise, valuePromise]).then(data => {
        const [senderDetails, receiverDetails, valueDetails] = data;
        const senderName = `${senderDetails.first_name} ${senderDetails.last_name}`;
        const receiverName = `${receiverDetails.first_name} ${receiverDetails.last_name}`;
        const { name: valueName, slack_logo: slackLogo } = valueDetails;

        // The message posted to the channel depends on the data provided.
        let text = `*${receiverName}* received a star`;

        if (!isAnonymous) {
            text += ` from *${senderName}*`;
        }

        text += ` for their performance in the value *${valueName}* :${slackLogo}: :superstar:`;

        if (comment) {
            text += `\n— _${comment}_`;
        }

        axios.post(SLACK_URL, {
            text
        });
    });

    return Star.create({
        sender_id: senderId,
        receiver_id: receiverId,
        value_id: valueId,
        comment,
        is_anonymous: isAnonymous
    });
};
