const commonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const cocClanWarStatus = require('../../../share/coc/cocClanWarStatus');
const cocButtonRow = require('../../../share/buttonRow/cocButtonRow');
const ExcelJS = require('exceljs');
const currentDate = require('../../../share/currentDate');

const fs = require('fs');

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.cocCurrentWar)
        .setDescription('Retrieve information about clan\'s current clan war ')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(20)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        try {
            const clan = await cocClient.cocClientLogin.getCurrentWar(clanTag);

            function getMemberButton(clan) {
                if (clan.state !== "notInWar") {

                    const bothClanMember = new ButtonBuilder()
                        .setCustomId('bothClanMember_' + commonVariable.cocCurrentWar)
                        .setLabel('both clan member info')
                        .setStyle(ButtonStyle.Primary);

                    return row = new ActionRowBuilder()
                        .addComponents(bothClanMember);
                }
            }

            async function getClanMembers() {

                const workbook = new ExcelJS.Workbook();
                const clanMemberSheet = workbook.addWorksheet(clan.clan.name);
                const oppMemberSheet = workbook.addWorksheet(clan.opponent.name);

                // Add data to the worksheet
                clanMemberSheet.addRow(['Name', 'Tag', 'Map Position', 'Town Hall Level']);
                oppMemberSheet.addRow(['Name', 'Tag', 'Map Position', 'Town Hall Level']);
                const memberList = clan.clan.members.map(members => [members.name, members.tag, members.mapPosition, members.townHallLevel]);
                const oppMemberList = clan.opponent.members.map(members => [members.name, members.tag, members.mapPosition, members.townHallLevel]);

                for (let i = 0; i < clan.clan.members.length; i++) {
                    clanMemberSheet.addRow([memberList[i][0], memberList[i][1], memberList[i][2], memberList[i][3]]);
                }

                for (let i = 0; i < clan.clan.members.length; i++) {
                    oppMemberSheet.addRow([oppMemberList[i][0], oppMemberList[i][1], oppMemberList[i][2], oppMemberList[i][3]]);
                }

                // Save the workbook to a file
                await workbook.xlsx.writeFile(`bothClanMemberInfo.xlsx`);
                return (`bothClanMemberInfo.xlsx`);

            }

            let clanwarStauts = "";

            const defaultEmbed = new EmbedBuilder()
                .setColor(commonVariable.cocEmbedColorCode)
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

            const response = await interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [getMemberButton(clan), cocButtonRow(clanTag)] });

            const confirmation = await response.awaitMessageComponent();

            if (confirmation.customId === 'bothClanMember_' + commonVariable.cocCurrentWar) {

                await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file, { attachment: (await getClanMembers()).toString(), name: (await getClanMembers()).toString() }], components: [getMemberButton(clan), cocButtonRow(clanTag)] });
                const fileNameToDelete = (await getClanMembers()).toString();

                // Check if the file exists
                if (fs.existsSync(fileNameToDelete)) {
                  // Delete the file
                  fs.unlinkSync(fileNameToDelete);
                  console.log(`File '${fileNameToDelete}' has been deleted.`);
                } else {
                  console.log(`File '${fileNameToDelete}' does not exist.`);
                }
            }

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




