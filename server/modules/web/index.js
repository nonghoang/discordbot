import fetch from 'node-fetch';
import {
    create as createMessage,
    getMessageWithDiscordId,
    getMessageNotPosted
} from 'services/message';
import {
    HEADERS
} from 'config/config';

export async function pullmessage(URL_CHANANEL) {
    console.log('======START PULL MESSAGES======');

    const data = await fetch(URL_CHANANEL, {
        method: 'GET',
        headers: HEADERS
    });

    const json = await data.json();
    json.forEach((message) => {
        create(message);
    });
}

export async function getMessages(req, res, next) {
    const messages = await getMessageNotPosted();
    res.json(messages);
}

async function create(message) {
    const data = await getMessageWithDiscordId(message.id);

    if (data) {
        return;
    }

    createMessage({
        attachments: JSON.stringify(message.attachments),
        timestamp: message.timestamp,
        mention_everyone: message.mention_everyone,
        discordId: message.id,
        pinned: message.pinned,
        edited_timestamp: message.edited_timestamp,
        author: JSON.stringify(message.author),
        content: message.content,
        channel_id: message.channel_id,
        created_date: new Date()
    });
}
