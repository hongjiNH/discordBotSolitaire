require('dotenv').config();

const botName = process.env.botName

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_solitaire')
        .setDescription("Ask a question and allowing user to click to add their username in " + botName)
        .addStringOption(option => option.setName('title')
            .setDescription('The question of this')
            .setRequired(true))
        .addStringOption(option => option.setName('question')
            .setDescription('The question of this')
            .setRequired(true)),
    async execute(interaction) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');
         
            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Confirm Ban')
                .setStyle(ButtonStyle.Danger);

            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder()
                .addComponents(cancel, confirm);

            await interaction.reply({
                content: `**${title}** \n ${question}?`,
                components: [row],
            });
        }
    },
};