const mineflayer = require('mineflayer');

const _listen = (socket) => {
    const bot = mineflayer.createBot({
        host: 'localhost', // optional
        port: 25565,       // optional
        username: 'PerformanceLog',
        version: "1.16.2"
    });

    bot.on("spawn", function () {
        bot.chat("/gamemode spectator @p");
    });

    bot.on('chat', function (username, message) {
        if (username !== 'PerformanceLog') {
            if (message.substring(0, 1) == '!') {
                let command = message.substring(1).split(" ");

                switch (command) {
                    case "say":

                        break;
                    default:
                        bot.chat(`/tellraw @a {"text":"${command} is not a recognized Performance-Log Minecraft command.", "color":"red"}`);
                        break;
                }
            }
        }
    })

    // Log errors and kick reasons:
    bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
    bot.on('error', err => console.log(err))
    
}

module.exports = {
    listen: _listen
}