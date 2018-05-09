import Discord from 'discord.js';

export function botPerson(token) {
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', message => {
        if (message.content === 'ping') {
            message.channel.send('pong');
        }
    });


    client.login(token);
}
