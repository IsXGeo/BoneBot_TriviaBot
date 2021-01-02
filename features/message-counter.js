const fs = require('fs')

module.exports = (client) => {
    const channelId = '794803806402641940'

    const stats = JSON.parse(fs.readFileSync(require.resolve('$data/stats.json')))

    const updateMessages = (guild, stat) => {
        const channel = guild.channels.cache.get(channelId)

        var data = JSON.stringify(stat, null, 4)
        fs.writeFileSync(require.resolve('$data/stats.json'), data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
        })

        channel.setName(`Message Count: ${stats.messageCount.toLocaleString()}`)
    }

    client.on('message', message => {
        if (!message.author.bot){
            stats.messageCount = stats.messageCount + 1
            const guild = client.guilds.cache.get('752781086882529280')
            updateMessages(guild, stats)
        }
    })

    client.on('messageDelete', message => {
        if (!message.author.bot){
            stats.messageCount = stats.messageCount - 1
            const guild = client.guilds.cache.get('752781086882529280')
            updateMessages(guild, stats)
        }
    })


}

module.exports.config = {
    displayName: 'Messages Count Channel'
}