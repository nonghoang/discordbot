import Discord from 'discord.js';
import Telegraf from 'telegraf';
import {
    BOT_TOKEN,
    CHANNELS
} from 'config/config';
import {
    getMessageNotPosted,
    updatePosted
} from 'services/message';

let chatId;
let ctxBot;

export function bot() {
    console.log('======INIT BOT======');
    const client = new Discord.Client();

    const teleBot = new Telegraf('610490336:AAFBHr4w4sFbZxOCl7pI-HTlYNyGZRcgfkw');
    teleBot.catch((err) => {
        console.log('ERROR teleBot: ', err);
    });

    teleBot.start((ctx) => {
        console.log('xxx')
    });

    teleBot.on('message', (ctx) => {
        console.log('aaa');
        chatId = ctx.message.chat.id;
        ctxBot = ctx;
    });

    teleBot.startPolling();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);

        CHANNELS.forEach((item) => {
            const channel = client.channels.get(item.to);

            setInterval(() => {
                handlePostMessage(channel, item.to);
            }, 3000);
        });
    });

    client.login(BOT_TOKEN);
}

async function handlePostMessage(channel, channelId) {
    const messages = await getMessageNotPosted(channelId);

    messages.forEach(message => {
        postMessage(message, channel, channelId);
    })
}

function postMessage(message, channel, channelId) {
    setTimeout(() => {
        postMessageToTelegram(channelId, message);
    }, 6000);

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

function postMessageToTelegram(channelId, message) {
    if (chatId && ctxBot) {
        if (true) {
            ctxBot.telegram.sendMessage(chatId, message.content);

            const attachments = JSON.parse(message.attachments);

            attachments.forEach(file => {
                ctxBot.telegram.sendMessage(chatId, file.url);
            });
        }
    }
}
