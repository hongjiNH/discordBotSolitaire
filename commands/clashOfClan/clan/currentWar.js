const file = require('../../../share/file')
const commonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const cocClanWarStatus = require('../../../share/coc/cocClanWarStatus');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.cocCurrentWar)
        .setDescription('Retrieve information about clan\'s current clan war ')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        try {
            const clan = await cocClient.cocClientLogin.getCurrentWar(clanTag);

            let clanwarStauts="";

            const defaultEmbed = new EmbedBuilder()
                .setColor(commonVariable.defaultEmbedColorCode)
                .setTimestamp()
                .setFooter(commonVariable.embedFooter);

            switch (clan.state) {
                case "notInWar":
                    defaultEmbed.setTitle("Not in war").setDescription('Your clan is not in any war now');
                    break;
                case "preparation":
                    defaultEmbed.setTitle("Preparing for war with " + `**${clan.opponent.name}**`).setDescription('Your clan are preparinng for war')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` },
                            { name: 'Start at', value: `**${clan.startTime}**` },
                        );
                    break;

                case "inWar":
                    defaultEmbed.setTitle("Fighting with " + `**${clan.opponent.name}**`).setDescription('Currently fighting, wish yall all the best')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` },
                            { name: 'End at', value: `**${clan.endTime}**` },);

                     clanwarStauts = cocClanWarStatus(clan);

                    defaultEmbed.addFields(
                        clanwarStauts,
                        { name: "Your team total stars", value: `**${clan.clan.stars}**` },
                        { name: "Opponent team total stars", value: `**${clan.opponent.stars}**` });

                    break;

                case "warEnded":
                    defaultEmbed.setTitle("War ended with " + `**${clan.opponent.name}**`).setDescription('End of clan war')
                        .setFields(
                            { name: 'Team size', value: `**${clan.teamSize}**` });

                     clanwarStauts = cocClanWarStatus(clan);

                    defaultEmbed.addFields(
                        clanwarStauts,
                        { name: "Your team total stars", value: `**${clan.clan.stars}**` },
                        { name: "Opponent team total stars", value: `**${clan.opponent.stars}**` });

                    break;
            }

            return interaction.reply({ embeds: [defaultEmbed], files: [file] });
        }
        catch (error) {
            if(error.status==500 || error.status===403){

                const urlButton = new ButtonBuilder()
                .setLabel('Join now')
                .setURL(commonVariable.supportLink)
                .setStyle(ButtonStyle.Link);
    
            const row = new ActionRowBuilder()
                .addComponents(urlButton);

                return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file], components: [row] });

            }
            else{
                return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

            }

        }

    },
};



