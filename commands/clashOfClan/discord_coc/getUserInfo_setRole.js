const commonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.cocDiscordSetRole)
        .setDescription('Adding your role using your clash of clan, clan\' s name to access your private coc chat ')
        .addStringOption(option => option.setName('usertag')
            .setDescription('Enter your user tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const userTag = interaction.options.getString('usertag');

        try {
            const defaultEmbed = new EmbedBuilder()
                .setColor(commonVariable.defaultEmbedColorCode)
                .setTimestamp()
                .setFooter(commonVariable.embedFooter);

            const clan = (await cocClient.cocClientLogin.getPlayer(userTag)).clan;

            if (clan === null) {
                defaultEmbed.setDescription('No role found, so I cant assign you any coc role')
            }
            else {

                const guild = interaction.guild;
                const user = interaction.member;
                const roleName = clan.name; 

                // Find the role in the guild
                const checkRole = guild.roles.cache.find((r) => r.name === roleName);

                if (checkRole && user.roles.cache.has(checkRole.id)) {
                       // The user has the specified role
                       createChannel(interaction,checkRole.id,clan.name);

                } else {
                    // The user doesn't have the specified role
                    const role=await interaction.guild.roles.create({
                        name: clan.name,
                        color: 0xFFFF00,
                    });

                    createChannel(interaction,role.id,clan.name);

                    await interaction.member.roles.add(role.id);

                }

                defaultEmbed.setDescription(`Your role is set to:  **${roleName}**`);

            }

            return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file] });
        }
        catch (error) {
            console.log(error);
            if (error.status === 500 || error.status === 403) {

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

const createChannel = (interaction,roleId,clanName) => {

    const channelName = clanName;

    const channel = interaction.guild.channels.cache.find((c) => c.name.toUpperCase() === channelName);
    if (channel === undefined) {
        // The channel was not found

        interaction.guild.channels.create({
            name: clanName,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: roleId,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        });
    }
}



