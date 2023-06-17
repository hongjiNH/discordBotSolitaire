const defaultEmbed = require('../../../share/embed/defaultEmbed');
const file = require('../../../share/file')
const conmmonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const cocClanWarStatus = require('../../../share/coc/cocClanWarStatus');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.cocCurrentWarLeague)
        .setDescription('Retrieve information about clan\'s current clan war league group')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        try {
            const clan = await cocClient.cocClientLogin.getCurrentWar(clanTag);

            //console.log(clan.status);

            switch (clan.state) {
                case "notInWar":
                    defaultEmbed.data.setTitle("Not in war").setDescription('Your clan is not in any war now').setFields();
                    break;
                case "preparation":
                    defaultEmbed.data.setTitle("Preparing for war with " + `**${clan.opponent.name}**`).setDescription('Your clan are preparinng for war')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` },
                        );
                    break;

                case "inWar":
                    defaultEmbed.data.setTitle("Fighting with " + `**${clan.opponent.name}**`).setDescription('Currently fighting, wish yall all the best')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` });

                    cocClanWarStatus(clan);

                    defaultEmbed.data.addFields(
                        { name: "Your team total stars", value: `**${clan.clan.stars}**` },
                        { name: "Opponent team total stars", value: `**${clan.opponent.stars}**` });

                    break;

                case "warEnded":
                    defaultEmbed.data.setTitle("War ended with " + `**${clan.opponent.name}**`).setDescription('End of clan war')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` });

                    cocClanWarStatus(clan);

                    defaultEmbed.data.addFields(
                        { name: "Your team total stars", value: `**${clan.clan.stars}**` },
                        { name: "Opponent team total stars", value: `**${clan.opponent.stars}**` });

                    break;
            }

            return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
        }
        catch (error) {

            return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

        }

    },
};



