require('dotenv').config();

const botName = process.env.botName
const logo = process.env.logo

const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, codeBlock } = require("discord.js");
const file = new AttachmentBuilder('../' + botName + '/assets/' + logo);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription("List of command for bot: " + botName),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("The list of the command for bot: " +botName)
            .addFields(
                { name: 'Ping with the bot', value: codeBlock("/ping")},
                { name: 'Support Server', value: codeBlock("/support")},
                { name: 'The command-(obviously you know this else how you see this)', value: codeBlock("/command") },
                { name: 'Version', value: codeBlock("/version")},
                { name: 'Solitaire', value: codeBlock("/solitaire") }
            )
            .setTimestamp()
            .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });
        return interaction.reply({ embeds: [exampleEmbed], files: [file] });
    },
};