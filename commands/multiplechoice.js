const Discord = require('discord.js');

module.exports = {
    commands: ['multiplechoice'],
    description: 'beings a multiple choice quiz',
    execute(message, questions, args) {

        const embededPing = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Quiz Question ' + args)
            .setDescription(questions.data[args - 1].question)
            .setTimestamp()
            .setFooter('Answer will be revealed in 10 seconds.');

        message.channel.send(embededPing);

    }
}