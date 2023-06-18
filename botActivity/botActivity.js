const { ActivityType } = require('discord.js');

module.exports = (client,Guilds) => {

    const randomIndexOFGuild=Math.floor(Math.random() * Guilds.length);
    const randomGuildId=client.guilds.cache.get(Guilds[randomIndexOFGuild]);
    const size=randomGuildId.memberCount;

    const statusMessages = [
        { name: 'with API', type: ActivityType.Playing },
        { name: size+' person\'s command', type:  ActivityType.Watching },
        { name: '👑 TEST BOT WORKS', type:  ActivityType.Playing },
        { name: size+' clan\'s war result', type:  ActivityType.Watching },
        { name: size+' people play with the command', type:  ActivityType.Watching },

        // Add more status messages here
    ];

    // Function to change the bot's status
    function changeStatus() {
        const randomIndex = Math.floor(Math.random() * statusMessages.length);
        const randomStatus = statusMessages[randomIndex];

        // Set the bot's status
        client.user.setActivity(randomStatus.name, {
            type:randomStatus.type,
        });


    }

    return changeStatus();

}


