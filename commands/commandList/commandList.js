const file=require('../../share/file');
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
        await interaction.reply({ embeds: [defaultEmbed], files: [file] });

        //COC
        defaultEmbed
        .setTitle("COC Command List")
        .setFields(
            { name: 'Retrieve information about clan\'s current clan war ', value: codeBlock("/"+commonVariable.cocCurrentWar) },
           // { name: 'List clan members', value: codeBlock("/"+commonVariable.cocListMember) },
            { name: 'Get clan informaiton', value: codeBlock("/"+commonVariable.cocGetClanInfo) }
        )
        .setDescription("The list of clash of clan command for bot: " +commonVariable.botName);
        await interaction.followUp({ embeds: [defaultEmbed.data], files: [file] });


    },
};