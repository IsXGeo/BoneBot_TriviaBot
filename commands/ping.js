module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    execute(message, client) {

        message.channel.send(`🏓 **PONG!** Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

    }
}