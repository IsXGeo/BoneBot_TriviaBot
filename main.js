const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const fs = require('fs')

require('dotenv').config()

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
})

const memberCount = require('./features/member-count-channel')
const messageCounter = require('./features/message-counter')

client.on('ready', () => {

    const messagesPath = ''


    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath,
        showWarns: true,
        testServers: '787991275944935424'

    })
        .setDefaultPrefix(process.env.PREFIX)

    memberCount(client)

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with Discord.js',
            type: 'PLAYING'
        }
    })
})

client.login(process.env.DJS_TOKEN)
