require('module-alias/register')
const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const fs = require('fs')

require('dotenv').config()

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
})

const memberCount = require('@features/member-count-channel')
const messageCounter = require('@features/message-counter')
const mongo = require('@util/mongo')

client.on('ready', () => {

    const messagesPath = ''

    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }


    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath,
        dbOptions
    })
        .setMongoPath(process.env.MONGO_URI)
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
