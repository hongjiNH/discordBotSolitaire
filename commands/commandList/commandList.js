const commonVariable=require('../../share/index');

const { SlashCommandBuilder, codeBlock,EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.command)
        .setDescription("List of command for bot: " + commonVariable.botName),
    async execute(interaction) {

        const defaultEmbed = new EmbedBuilder()
        .setColor(commonVariable.defaultEmbedColorCode)
        .setTimestamp()
        .setFooter(commonVariable.embedFooter)
        
        .setTitle("Normal Command List")
        .setFields(
            { name: 'Ping with the bot', value: codeBlock("/"+commonVariable.ping)},
            { name: 'Support Server', value: codeBlock("/"+commonVariable.support)},
            { name: 'The command-(obviously you know this else how you see this)', value: codeBlock("/"+commonVariable.command) },
            { name: 'Version', value: codeBlock("/"+commonVariable.version)},
            { name: 'List that allow user to add /remove themself', value: codeBlock("/"+commonVariable.solitaire) },
            { name: 'Count Down timer', value: codeBlock("/"+commonVariable.countdown) },
            { name: 'Get my community server link', value: codeBlock("/"+commonVariable.community) },
            { name: 'Adding my bot to other server', value: codeBlock("/"+commonVariable.addbot) }
        )
        .setDescription("The list of the normal command for bot: " +commonVariable.botName);

        //COC
        const defaultEmbed1 = new EmbedBuilder()
        .setColor(commonVariable.defaultEmbedColorCode)
        .setTimestamp()
        .setFooter(commonVariable.embedFooter)

        .setTitle("COC Command List")
        .setFields(
            { name: 'Retrieve information about clan\'s current clan war ', value: codeBlock("/"+commonVariable.cocCurrentWar) },
           // { name: 'List clan members', value: codeBlock("/"+commonVariable.cocListMember) },
            { name: 'Get clan informaiton', value: codeBlock("/"+commonVariable.cocGetClanInfo)},
            { name: 'Get Gold pass star and end date', value: codeBlock("/"+commonVariable.cocGoldPass)},
            //{ name: 'Create a list for coc allowing user to select their user tag', value: codeBlock("/"+commonVariable.cocCreateList)},
            { name: 'Create a private channel with ur coc clan name , create a role with ur coc clan name , add a user in', value: codeBlock("/"+commonVariable.cocDiscordSetRole)},
        )
        .setDescription("The list of clash of clan command for bot: " +commonVariable.botName);
        await interaction.reply({ embeds: [defaultEmbed,defaultEmbed1], files: [commonVariable.file] });

    },
};