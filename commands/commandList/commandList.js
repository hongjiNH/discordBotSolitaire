const defaultEmbed =require('../../share/embed/defaultEmbed');
const file=require('../../share/file');
const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder, codeBlock } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.command)
        .setDescription("List of command for bot: " + conmmonVariable.botName),
    async execute(interaction) {

        defaultEmbed.data
        .setTitle("Normal Command List")
        .setFields(
            { name: 'Ping with the bot', value: codeBlock("/"+conmmonVariable.ping)},
            { name: 'Support Server', value: codeBlock("/"+conmmonVariable.support)},
            { name: 'The command-(obviously you know this else how you see this)', value: codeBlock("/"+conmmonVariable.command) },
            { name: 'Version', value: codeBlock("/"+conmmonVariable.version)},
            { name: 'List that allow user to add /remove themself', value: codeBlock("/"+conmmonVariable.solitaire) },
            { name: 'Count Down timer', value: codeBlock("/"+conmmonVariable.countdown) },
            { name: 'Get my community server link', value: codeBlock("/"+conmmonVariable.community) },
            { name: 'Adding my bot to other server', value: codeBlock("/"+conmmonVariable.addbot) }
        )
        .setDescription("The list of the normal command for bot: " +conmmonVariable.botName);
        await interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

        //COC
        defaultEmbed.data
        .setTitle("COC Command List")
        .setFields(
            { name: 'Retrieve information about clan\'s current clan war ', value: codeBlock("/"+conmmonVariable.cocCurrentWar) },
            { name: 'List clan members', value: codeBlock("/"+conmmonVariable.cocListMember) }
        )
        .setDescription("The list of clash of clan command for bot: " +conmmonVariable.botName);
        await interaction.followUp({ embeds: [defaultEmbed.data], files: [file] });


    },
};