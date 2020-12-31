const path = require('path')
const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json')
const client = new Discord.Client();

const { prefix } = require('./config.json')
const { get } = require('https');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log('BoneBot Mk.II has successfully booted!')
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with depression',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/hensbo'
        }
    })

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                //console.log(file, option)
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')
})

client.login(config.token);