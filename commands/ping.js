module.exports = {
    commands: ['ping'],
    callback: (message, args, text) => {

        var client = message.client
        message.channel.send(`🏓 **PONG!** Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

    }
}