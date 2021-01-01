const { Guild } = require("discord.js")

module.exports = (client) => {
    const channelID = '794360541506175006'

    const updateMembers = guild => {
        const channel = guild.channels.cache.get(channelID)
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }

    client.on('guildMemberAdd', member => updateMembers(member.guild))
    client.on('guildMemberRemove', member => updateMembers(member.guild))

    const guild = client.guilds.cache.get('752781086882529280')
    updateMembers(guild)
}

module.exports.config = {
    displayName: 'Member Count Channel'
}