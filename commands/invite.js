const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'get a server invite',
    execute(message, client, args) {

        message.author.send(`Here's the invite you asked for ${message.author}!\nhttps://discord.gg/XmtA8K3nJa`);

    }
}