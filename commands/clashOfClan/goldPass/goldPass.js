const commonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const cocButtonRow =require('../../../share/buttonRow/cocButtonRow');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.cocGoldPass)
        .setDescription('Get information about the current gold pass season'),

    async execute(interaction) {

        try {
            const clan = await cocClient.cocClientLogin.getGoldPassSeason();


            const defaultEmbed = new EmbedBuilder()
                .setColor(commonVariable.defaultEmbedColorCode)
                .setTimestamp()
                .setFooter(commonVariable.embedFooter)
                .setTitle("Gold Pass")
                .setDescription(`It will end in ${clan.endTime}`)
                .setFields(
                    { name: 'Start time', value: `${clan.startTime}` },
                    { name: 'End time', value: `${clan.endTime}` });

            return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [cocButtonRow(null)]});
        }
        catch (error) {

            if (error.status == 500 || error.status === 403) {

                const urlButton = new ButtonBuilder()
                    .setLabel('Join now')
                    .setURL(commonVariable.supportLink)
                    .setStyle(ButtonStyle.Link);

                const row = new ActionRowBuilder()
                    .addComponents(urlButton);

                return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [commonVariable.file], components: [row] });

            }
            else {
                return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [commonVariable.file] });

            }

        }

    },
};



