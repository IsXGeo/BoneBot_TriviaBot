const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '!'
const fs = require('fs');
const { get } = require('https');

const myToken = 'NzkzNDE5MzA4MTY0MzE3MjE0.X-r_UA.2cgo3XFK9hcXSEv1giKNCIZ-2Iw'; // Add your own bot token here!

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('BoneBot Mk.II has successfully booted!')
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with depression',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/hensbo'
        }
    })
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, client, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})

client.login(myToken);