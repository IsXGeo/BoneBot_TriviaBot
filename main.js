const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!'

const fs = require('fs');
const { get } = require('https');

var multiquestions;

fs.readFile('multiquestions.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    multiquestions = JSON.parse(data.toString());

})

var questions;
let questionsobject = {};

fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    questionsobject = JSON.parse(data);
    questions = JSON.parse(data.toString());

})

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

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

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, client);
            break;
        case 'multiplechoice':
            client.commands.get('multiplechoice').execute(message, multiquestions, args);
            break;
        case 'quiz':
            client.commands.get('quiz').execute(message, questions, questionsobject, 15, client);
            break;
        default:
            message.channel.send('Unknown command!');
    }
})

client.login('NzkzNDE5MzA4MTY0MzE3MjE0.X-r_UA.hy4Vkx8f_viN1EAp_NG3bXrAn6o');