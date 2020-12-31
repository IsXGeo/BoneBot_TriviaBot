module.exports = {
    commands: ['invite'],
    expectedArgs: '[@User]',
    maxArgs: 1,
    requiredRoles: ['Mod', 'Head Mod'],
    callback: (message, args, text) => {
        const user = +args[0]


        message.author.send(`Here's the invite you asked for ${message.author}!\nhttps://discord.gg/XmtA8K3nJa`);
    }
}