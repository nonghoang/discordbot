import Discord from 'discord.js';
import { BOT_TOKEN } from 'config/config';
import {
    getMessageNotPosted,
    updatePosted
} from 'services/message';

export function bot() {
    console.log('======INIT BOT======');
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        const channel = client.channels.get('442243825272881155');

        setInterval(() => {
            handlePostMessage(channel);
        }, 1000);
    });

    client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.reply('Hello discord');
        }
    });

    client.login(BOT_TOKEN);
}

async function handlePostMessage(channel) {
    const messages = await getMessageNotPosted();

    messages.forEach(message => {
        postMessage(message, channel);
    })
}

function postMessage(message, channel) {
    const content = message.content;
    const attachments = JSON.parse(message.attachments);

    let urls = [];
    attachments.forEach(file => {
        urls.push(file.url);
    });

    channel.send(content, {
        files: urls,
    });

   updatePosted(message._id);
}
