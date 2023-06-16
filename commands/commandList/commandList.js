const defaultEmbed =require('../../share/defaultEmbed');
const file=require('../../share/file');
const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder, codeBlock } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.command)
        .setDescription("List of command for bot: " + conmmonVariable.botName),
    async execute(interaction) {
        defaultEmbed.data
        .setTitle("Command List")
        .setFields(
            { name: 'Ping with the bot', value: codeBlock("/"+conmmonVariable.ping)},
            { name: 'Support Server', value: codeBlock("/"+conmmonVariable.support)},
            { name: 'The command-(obviously you know this else how you see this)', value: codeBlock("/"+conmmonVariable.command) },
            { name: 'Version', value: codeBlock("/"+conmmonVariable.version)},
            { name: 'List that allow user to add /remove themself', value: codeBlock("/"+conmmonVariable.solitaire) },
            { name: 'Count Down timer', value: codeBlock("/"+conmmonVariable.countdown) }
        )
        .setDescription("The list of the command for bot: " +conmmonVariable.botName);
        return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
    },
};