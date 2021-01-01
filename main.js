require('module-alias/register')

const path = require('path')
const Discord = require('discord.js');
const fs = require('fs');

const config = require('@root/config.json')
const client = new Discord.Client();

const { prefix } = require('@root/config.json')
const { get } = require('https');

const memberCount = require('@features/member-count.js')
const mongo = require('@util/mongo.js')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log('BoneBot Mk.II has successfully booted!')

    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo')
        } finally {
            mongoose.connection.close()
        }

    })

    memberCount(client)

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with depression',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/hensbo'
        }
    })
})

client.login(config.token);