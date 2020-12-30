const Discord = require('discord.js');
const FuzzySet = require('fuzzyset');

module.exports = {
    name: 'quiz',
    description: 'beings a quiz',
    execute(message, questions, questionsobject, time, client) {

        var mili = time * 1000;
        var channelID = message.channel.id;

        console.log('Quiz Initiated');
        console.log('\x1b[33m' + questionsobject.trivia.length + ' \x1b[0mquestions found');

        const maxNum = questionsobject.trivia.length;
        //const maxNum = 4;
        var timeout = false;
        var correct = false;
        var qNum = getRandomInt(maxNum);

        var ans = lookingGood(questions.trivia[qNum].Answer);
        var qst = questions.trivia[qNum].Question;

        console.log('Question \x1b[33m' + qNum + ' \x1b[0mwas chosen. The answer is \x1b[32m' + ans);

        fs = FuzzySet([ans], false);

        client.on('message', message => {
            if (message.channel.id == channelID && !message.author.bot && timeout != true) {
                console.log(message.author.username + ' > ' + message.content);
                console.log(fs)
                var result = fs.get(message.content)
                console.log(result)
                if (result[0][0] >= 0.7) {
                    console.log('Correct guess!')
                    correct = true;
                    setTimeout(timedout, 1);
                }
                console.log(result[0][0])
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
                .setDescription(message.author.username + ' guessed the correct answer!\nThe answer was **' + lookingGood(ans) + '**')
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