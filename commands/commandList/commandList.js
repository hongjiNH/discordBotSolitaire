const defaultEmbed =require('../../share/defaultEmbed');
const file=require('../../share/file');
const commonWord=require('../../share/index');

const { SlashCommandBuilder, codeBlock } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription("List of command for bot: " + commonWord.botName),
    async execute(interaction) {
        defaultEmbed.data
        .setTitle("The list of the command for bot: " +commonWord.botName)
        .setFields(
            { name: 'Ping with the bot', value: codeBlock("/ping")},
            { name: 'Support Server', value: codeBlock("/support")},
            { name: 'The command-(obviously you know this else how you see this)', value: codeBlock("/command") },
            { name: 'Version', value: codeBlock("/version")},
            { name: 'Solitaire', value: codeBlock("/solitaire") },
            { name: 'Count Down', value: codeBlock("/countdown") }
        );
        return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
    },
};