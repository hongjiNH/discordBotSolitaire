const defaultEmbed = require('../../../share/embed/defaultEmbed');
const file = require('../../../share/file')
const conmmonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.cocListMember)
        .setDescription('List clan members. ')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        try {
            const clan = await cocClient.cocClientLogin.getClanMembers(clanTag);

            console.log(clan);
            return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

        }
        catch (error) {

            return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

        }

    },
};



