import Discord from 'discord.js';
import {
    BOT_TOKEN,
    CHANNELS
} from 'config/config';
import {
    getMessageNotPosted,
    updatePosted
} from 'services/message';

export function bot() {
    console.log('======INIT BOT======');
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);

        CHANNELS.forEach((item) => {
            const channel = client.channels.get(item.to);

            setInterval(() => {
                handlePostMessage(channel, item.to);
            }, 1000);
        });
    });

    client.login(BOT_TOKEN);
}

export function botPerson() {
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log('I am ready!');
    });

    client.on('message', message => {
        if (message.content === 'ping') {
            message.channel.send('pong');
        }
    });


    client.login('NDQzMjI4NjA3MzMxMDQxMjkx.DdPXpQ.T95at3LWq44UcpeUIYAYIlAbqaU');
}

async function handlePostMessage(channel, channelId) {
    const messages = await getMessageNotPosted(channelId);

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
