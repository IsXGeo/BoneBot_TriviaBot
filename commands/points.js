const fs = require('fs');

module.exports = {
    commands: ['points'],
    callback: (message, args, text) => {

        const userData = JSON.parse(fs.readFileSync('./data/users.json'));

        var findUser = findElement(userData.users, "userid", message.author.id);
        var findIndex = getIndex(userData.users, "userid", message.author.id);

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

        message.channel.send(`You have ${userData.users[findIndex].totalWins} points ${message.author}!`);

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
    }
}