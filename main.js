const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands')

require('module-alias/register')
require('dotenv').config()

const client = new DiscordJS.Client();

const config = require('@root/config.json')

const memberCount = require('@features/member-count-channel.js')

client.on('ready', () => {
    console.log('BoneBot Mk.II has successfully booted!')

    new WOKCommands(client, 'commands', 'features')

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