const defaultEmbed = require('../../../share/embed/defaultEmbed');
const file = require('../../../share/file')
const commonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.cocGoldPass)
        .setDescription('Get information about the current gold pass season'),

    async execute(interaction) {



        try {
            const clan = await cocClient.cocClientLogin.getGoldPassSeason();
            console.log(clan);
            

            defaultEmbed.data
                .setTitle("Clash Of Clan Gold Pass")
                .setDescription(`It will end in ${clan.endTime}`)
                .setFields(
                    { name: 'Start time', value: `${clan.startTime}` },
                    { name: 'End time', value: `${clan.endTime}` });

            return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
        }
        catch (error) {

            return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

        }

    },
};



