const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
const fs = require('fs');

require('dotenv').config();

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
});

const memberCount = require('./features/member-count-channel');
const mongo = require('./util/mongo');

client.on('ready', () => {

    const messagesPath = require('./data/messages.json');

    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };


    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath,
        dbOptions,
        testServers: '752781086882529280'
    })
        .setDefaultPrefix(process.env.PREFIX);

    memberCount(client);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with Discord.js',
            type: 'PLAYING'
        }
    });
});

client.login(process.env.DEVBOT_TOKEN);
