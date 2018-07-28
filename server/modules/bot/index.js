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
                handlePostMessage(channel, item.to, item.isPostToTelegram);
            }, 8000); // 8 second 8000
        });
    });

    client.login(BOT_TOKEN);
}

async function handlePostMessage(channel, channelId, isPostToTelegram) {
    const messages = await getMessageNotPosted(channelId);

    messages.forEach(message => {
        postMessage(message, channel, channelId, isPostToTelegram);
    })
}

function postMessage(message, channel, channelId, isPostToTelegram) {
    if (isPostToTelegram) {
        setTimeout(() => {
            postMessageToTelegram(channelId, message);
        }, 360000); // 6 minute 360000
    }

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
            const text = '\n\nIf you want to receive the signal immediately, visit the website: https://signalleaks.com';
            ctxBot.telegram.sendMessage(chatId, message.content + text);

            const attachments = JSON.parse(message.attachments);

            attachments.forEach(file => {
                ctxBot.telegram.sendMessage(chatId, file.url);
            });
        }
    }
}
