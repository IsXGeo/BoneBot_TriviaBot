const fs = require('fs')

module.exports = (client) => {
    const channelId = '794803806402641940'

    const interval = 5 * 60 * 1000
    
    const stats = JSON.parse(fs.readFileSync(require.resolve('$data/stats.json')))

    const theGuild = client.guilds.cache.get('752781086882529280')

    client.on('ready', () => {
        setInterval(update(theGuild, stats), interval)
    })

    const updateMessages = (stat) => {

        var data = JSON.stringify(stat, null, 4)
        fs.writeFileSync(require.resolve('$data/stats.json'), data, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`)
            }
        })

    }

    function update(guild, stats){
        console.log('Message count updated')
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Message Count: ${stats.messageCount.toLocaleString()}`)
    }

    client.on('message', message => {
        if (!message.author.bot){
            stats.messageCount = stats.messageCount + 1
            updateMessages(stats)
        }
    })

    client.on('messageDelete', message => {
        if (!message.author.bot){
            stats.messageCount = stats.messageCount - 1
            updateMessages(stats)
        }
    })


}

module.exports.config = {
    displayName: 'Messages Count Channel'
}