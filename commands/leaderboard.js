const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    category: 'Trivia',
    description: 'Shows the top scorers on the server',
    commands: ['leaderboard', 'top'],
    callback: (message) => {

        const userData = JSON.parse(fs.readFileSync(require.resolve('$data/users.json')))
        var sortedData = userData
        sortedData.users.sort((a, b) => parseInt(b.totalWins) - parseInt(a.totalWins))

        if (sortedData.users[0].totalWins == 0) {
            const embededLose = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Leaderboards')
                .setDescription('```Nobody has scored any points!```')
                .setTimestamp()
                .setFooter('Server Leaderboards');

            message.channel.send(embededLose);
        } else if (sortedData.users[1].totalWins == 0) {
            const embededTop = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Leaderboards')
                .setDescription('```🥇 1st is ' + sortedData.users[0].username + ' with ' + sortedData.users[0].totalWins + ' points.\n🥈 2nd is empty.\n🥉 3rd is empty.```')
                .setTimestamp()
                .setFooter('Server Leaderboards');

            message.channel.send(embededTop);
        } else if (sortedData.users[2].totalWins == 0) {
            const embededTop = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Leaderboards')
                .setDescription('```🥇 1st is ' + sortedData.users[0].username + ' with ' + sortedData.users[0].totalWins + ' points.\n🥈 2nd is ' + sortedData.users[1].username + ' with ' + sortedData.users[1].totalWins + ' points.\n🥉 3rd is empty.```')
                .setTimestamp()
                .setFooter('Server Leaderboards');

            message.channel.send(embededTop);
        } else {
            const embededTop = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Leaderboards')
                .setDescription('```🥇 1st is ' + sortedData.users[0].username + ' with ' + sortedData.users[0].totalWins + ' points.\n🥈 2nd is ' + sortedData.users[1].username + ' with ' + sortedData.users[1].totalWins + ' points.\n🥉 3rd is ' + sortedData.users[2].username + ' with ' + sortedData.users[2].totalWins + ' points.```')
                .setTimestamp()
                .setFooter('Server Leaderboards');

            message.channel.send(embededTop);
        }

        function findElement(arr, value) {
            var max;
            for (var i = 0; i < arr.length; i++) {
                if (max == null || parseInt(arr[i][value]) > parseInt(max[value])) {
                    max = arr[i];
                }
            }
            return max;
        }

    }
}