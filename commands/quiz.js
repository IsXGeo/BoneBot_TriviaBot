const Discord = require('discord.js');
const FuzzySet = require('fuzzyset');
const fs = require('fs');

require('dotenv').config();

module.exports = {
    commands: ['quiz'],
    maxArgs: 1,
    syntaxError: 'Incorrect syntax! Use `{PREFIX}quiz (NumOfQuestions)` eg. `{PREFIX}quiz 15`',
    callback: async ({ message, args }) => {

        var times;

        if (args[0] == null) { times = 10; } else { times = args[0]; }

        times = parseInt(times);

        if (Number.isInteger(times)) {

            const questionsObject = JSON.parse(fs.readFileSync('./data/questions.json'));
            const questions = JSON.parse(fs.readFileSync('./data/questions.json').toString());
            const userData = JSON.parse(fs.readFileSync('./data/users.json'));

            // players = [[isgeo, 1], [trjmt, 2], [diogenes, 11]] etc..
            const players = [];

            const PREFIX = process.env.PREFIX;

            const maxNum = questionsObject.trivia.length;
            var closeness = process.env.CLOSENESS;

            const time = process.env.TIME;
            const mili = time * 1000;

            var client = message.client;

            var channelID = message.channel.id;

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

                    players.push([message2.author.id, totalWins]);

                    var result = set.get(message2.content);
                    if (result != null) {
                        if (result[0][0] >= closeness) {
                            correct = true;
                            winner = message2;
                            winner.react('✅');
                            userData.users[findIndex].totalWins = totalWins + 1;
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
                    });
                }
            });

            for (i = 0; i < times; i++) {
                var timeout = false;
                var correct = false;
                var qNum = getRandomInt(maxNum);

                var winner;
                var totalWins;

                var ans = lookingGood(questions.trivia[qNum].Answer);
                var qst = questions.trivia[qNum].Question;
                var qstl = qst.length;

                if (qstl >= 15) { closeness = 0.75; }
                if (Number.isInteger(questions.trivia[qNum].Answer)) { closeness = 1; }

                console.log('Question \x1b[33m' + qNum + ' \x1b[0mwas chosen. The answer is \x1b[32m' + ans + '\x1b[0m');
                set = FuzzySet([ans], true);

                const embededQ = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('❓  Quiz Question ' + (i + 1))
                    .setDescription(qst)
                    .setTimestamp()
                    .setFooter('⌛  The answer will be revealed in ' + time + ' seconds.');

                message.channel.send(embededQ);

                setTimeout(timedout, mili);
                await wait(mili);
            }

        } else {
            message.reply(`Incorrect syntax! Please input a numerical value!`);
        }

        // End if integer | ======================================================================================= |

        function wait(miliseconds) {
            return new Promise(resolve => setTimeout(resolve, miliseconds));
        }

        function timedout() {
            if (timeout == false) {
                timeout = true;
                if (correct == true) {
                    win();
                } else {
                    lose();
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

        async function lose() {
            const embededLose = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('😭  Time is up!')
                .setDescription('Noone guessed the correct answer!\nThe answer was **' + lookingGood(ans) + '**')
                .setTimestamp()
                .setFooter('⌛  The next question will appear shortly.');

            message.channel.send(embededLose);
            await wait(2000);
        }

        async function win() {
            const embededWin = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('🥳  Correct!')
                .setDescription('**' + winner.author.username + '** guessed the correct answer!\nThe answer was **' + lookingGood(ans) + '**')
                .setTimestamp()
                .setFooter('⌛  The next question will appear shortly.');

            message.channel.send(embededWin);
            await wait(2000);
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function lookingGood(string) {
            string = string.toLowerCase();
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    }
};