module.exports = {
    commands: ['invite'],
    requiredRoles: ['Owner', 'Mod', 'Head Mod'],
    callback: ({ message }) => {

        message.author.send(`Here's the invite you asked for ${message.author}!\nhttps://discord.gg/XmtA8K3nJa`);
    }
}