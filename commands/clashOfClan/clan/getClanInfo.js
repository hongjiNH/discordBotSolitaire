const defaultEmbed = require('../../../share/embed/defaultEmbed');
const file = require('../../../share/file')
const conmmonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.cocGetClanInfo)
        .setDescription('Get clan information ')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        try {

            const clan = await cocClient.cocClientLogin.getClan(clanTag);

            defaultEmbed.data
                .setTitle(`${clan.name}\'s info`)
                .setDescription('Total member: ' + clan.memberCount)
                .setFields(
                    { name: 'Level', value: `${clan.level}`, inline: true },
                    { name: 'Point', value: `${clan.points}`, inline: true },
                    { name: 'Versus Point', value: `${clan.versusPoints}`, inline: true },
                    { name: 'Required Throphies', value: `${clan.requiredTrophies}`, inline: true },
                    { name: 'Required Town level', value: `${clan.requiredTownHallLevel}`, inline: true },
                    { name: 'Required Versus Throphies', value: `${clan.requiredVersusTrophies}`, inline: true },
                    { name: 'War Frequency', value: `${clan.warFrequency}` },
                    { name: 'War Win Streak', value: `${clan.warWinStreak}`, inline: true },
                    { name: 'War wins', value: `${clan.warWins}`, inline: true },
                    { name: 'War Tie', value: `${clan.requiredTownHallLevel}`, inline: true },
                    { name: 'War Lose', value: `${clan.warLosses}`, inline: true },
                    { name: 'War League', value: `${clan.warLeague.name}` },
                    { name: 'Captical Point', value: `${clan.capitalPoints}`, inline: true },
                    { name: 'Captital League', value: `${clan.capitalLeague.name}`, inline: true },
                );

            for (let i = 0; i < clan.clanCapital.districts.length; i++) {
                console.log(clan.clanCapital.districts[i].name);
                defaultEmbed.data.addFields(
                    { name:`${clan.clanCapital.districts[i].name}`, value: `${clan.clanCapital.districts[i].districtHallLevel}`, inline: true },
                );
            };

            return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

        }
        catch (error) {

            return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

        }

    },
};



