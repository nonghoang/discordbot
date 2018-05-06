import Discord from 'discord.js';
import { BOT_TOKEN } from 'config/config';

export function bot() {
    console.log('======INIT BOT======');
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.reply('Hello with discord');
        }
    });

    client.login(BOT_TOKEN);
}
