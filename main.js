require('better-module-alias')(__dirname)
const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const fs = require('fs')

require('dotenv').config()

const client = new DiscordJS.Client()

const memberCount = require('$features/member-count-channel')
const messageCounter = require('$features/message-counter')

client.on('ready', () => {
    new WOKCommands(client, 'commands', 'features')
        .setDefaultPrefix('$')

    memberCount(client)
    messageCounter(client)

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with Discord.js',
            type: 'PLAYING'
        }
    })
})

client.login(process.env.DJS_TOKEN)
