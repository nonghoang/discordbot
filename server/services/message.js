import Message from 'models/message';

export function create(options) {
    let {
        post_channel_id,
        attachments,
        timestamp,
        mention_everyone,
        discordId,
        pinned,
        edited_timestamp,
        author,
        content,
        channel_id,
        created_date
    } = options;

    const posted = false;

    const message = new Message({
        post_channel_id,
        attachments,
        timestamp,
        mention_everyone,
        discordId,
        pinned,
        posted,
        edited_timestamp,
        author,
        content,
        channel_id,
        created_date
    });

    return message.save();
}

export function getMessageWithDiscordId(discordId) {
    return Message.findOne({discordId: discordId});
}

export function getMessageNotPosted(channelId) {
    return Message.find({
        posted: false,
        post_channel_id: channelId
    }).sort({
        timestamp: 'desc'
    }).exec();
}

export function updatePosted(id) {
    return Message.findByIdAndUpdate(id, {
        posted: true
    }).exec();
}
