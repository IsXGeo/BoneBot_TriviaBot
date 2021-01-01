const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands')
const fs = require('fs')

require('module-alias/register')
require('dotenv').config()

const client = new DiscordJS.Client();

const memberCount = require('@features/member-count-channel.js')

client.on('ready', () => {
    new WOKCommands(client, 'commands', 'features')
        .setDefaultPrefix('$');

    memberCount(client)

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with depression',
            type: 'COMPETING',
            url: ''
        }
    })
})

fs.access('./config.json', fs.F_OK, (err) => {
    if (err) {
        console.log('No local-config found, using convar')
        client.login(process.env.DJS_TOKEN)
        return
    }
    console.log('Config found, ignoring convar')
    var config = require('@root/config.json')
    client.login(config.token)
})
