import fetch from 'node-fetch';
import {
    create as createMessage,
    getMessageWithDiscordId,
    getMessageNotPosted
} from 'services/message';
import {
    HEADERS
} from 'config/config';

export async function pullmessage(channel) {
    const data = await fetch(channel.from, {
        method: 'GET',
        headers: HEADERS
    });

    const json = await data.json();
    json.forEach((message) => {
        create(message, channel.to);
    });
}

export async function getMessages(req, res, next) {
    const messages = await getMessageNotPosted();
    res.json(messages);
}

async function create(message, postChannelId) {
    const data = await getMessageWithDiscordId(message.id);

    if (data) {
        return;
    }

    let messageData = message.content;

    if (message.content) {
        messageData = message.content.replace(/<@.*>/, '');
    }

    createMessage({
        post_channel_id: postChannelId,
        attachments: JSON.stringify(message.attachments),
        timestamp: message.timestamp,
        mention_everyone: message.mention_everyone,
        discordId: message.id,
        pinned: message.pinned,
        edited_timestamp: message.edited_timestamp,
        author: JSON.stringify(message.author),
        content: messageData,
        channel_id: message.channel_id,
        created_date: new Date()
    });
}
