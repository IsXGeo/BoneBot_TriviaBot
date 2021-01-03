const Discord = require('discord.js');
const FuzzySet = require('fuzzyset');
const fs = require('fs');

module.exports = {
    commands: ['quiz'],
    callback: ({ message }) => {

        const questionsObject = JSON.parse(fs.readFileSync('./data/questions.json'));
        const questions = JSON.parse(fs.readFileSync('./data/questions.json').toString());

        const userData = JSON.parse(fs.readFileSync('./data/users.json'));

        console.log('Quiz Initiated');

        const maxNum = questionsObject.trivia.length;
        const time = 20;

        var client = message.client
        var timeout = false;
        var correct = false;
        var qNum = getRandomInt(maxNum);

        var mili = time * 1000;
        var channelID = message.channel.id;

        var winner;
        var totalWins;

        var closeness = 0.85;
        var ans = lookingGood(questions.trivia[qNum].Answer);
        var qst = questions.trivia[qNum].Question;
        var qstl = qst.length;

        if (qstl >= 15) {
            closeness = 0.75;
        }
        if (qstl <= 5) {
            closeness = 1;
        }

        console.log('Question \x1b[33m' + qNum + ' \x1b[0mwas chosen. The answer is \x1b[32m' + ans + '\x1b[0m');

        set = FuzzySet([ans], true);

        client.on('message', message2 => {
            if (message2.channel.id == channelID && !message2.author.bot && timeout != true) {

                var findUser = findElement(userData.users, "userid", message2.author.id);
                var findIndex = getIndex(userData.users, "userid", message2.author.id);
                if (findUser == null) {
                    console.log('User not found! \n' + findUser);
                    userData.users.push({
                        "userid": message2.author.id,
                        "username": message2.author.username,
                        "totalWins": 0
                    });
                } else {
                    totalWins = findUser.totalWins;
                }

                var result = set.get(message2.content)
                if (result != null) {
                    if (result[0][0] >= closeness) {
                        correct = true;
                        winner = message2;
                        winner.react('✅');
                        userData.users[findIndex].totalWins = totalWins + 1
                        setTimeout(timedout, 1);
                        logTxt = '\x1b[32m' + message2.content + '\x1b[0m @% \x1b[32m' + result[0][0] + '\x1b[0m';
                    } else {
                        logTxt = '\x1b[31m' + message2.content + '\x1b[0m @% \x1b[32m' + result[0][0] + '\x1b[0m';
                        message2.react('❌');
                    }
                    console.log('\x1b[33m' + message2.author.username + '\x1b[0m > ' + logTxt);
                } else {
                    logTxt = '\x1b[31m' + message2.content + '\x1b[0m @% \x1b[32m0';
                    console.log('\x1b[33m' + message2.author.username + '\x1b[0m > ' + logTxt);
                    message2.react('❌');
                }

                var data = JSON.stringify(userData, null, 4);

                fs.writeFile('./data/users.json', data, 'utf8', (err) => {
                    if (err) {
                        console.log(`Error writing file: ${err}`);
                    }
                })

            }
        })

        const embededQ = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('❓  Quiz Question ' + qNum)
            .setDescription(qst)
            .setTimestamp()
            .setFooter('⌛  The answer will be revealed in ' + time + ' seconds.');

        message.channel.send(embededQ);

        setTimeout(timedout, mili);

        function timedout() {
            if (timeout == false) {
                timeout = true;
                if (correct == true) {
                    win()
                } else {
                    lose()
                }
            }
        }

        function findElement(arr, name, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][name] == value) {
                    return arr[i];
                }
            }
        }

        function getIndex(arr, name, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][name] == value) {
                    return i;
                }
            }
        }

        function lose() {
            const embededLose = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('😭  Time is up!')
                .setDescription('Noone guessed the correct answer!\nThe answer was **' + lookingGood(ans) + '**')
                .setTimestamp()
                .setFooter('⌛  The next question will appear shortly.');

            message.channel.send(embededLose);
        }

        function win() {
            const embededWin = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('🥳  Correct!')
                .setDescription('**' + winner.author.username + '** guessed the correct answer!\nThe answer was **' + lookingGood(ans) + '**')
                .setTimestamp()
                .setFooter('⌛  The next question will appear shortly.');

            message.channel.send(embededWin);
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function lookingGood(string) {
            string = string.toLowerCase();
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    }
}