require('dotenv').config();

const botName = process.env.botName
const logo = process.env.logo

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, AttachmentBuilder, userMention } = require("discord.js");
const file = new AttachmentBuilder('../' + botName + '/assets/' + logo);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_solitaire')
        .setDescription("Ask a question and allowing user to click to add their username in " + botName)
        .addSubcommand(subcommand =>
            subcommand
                .setName('day')
                .setDescription('How many day/s before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
                .setName('hour')
                .setDescription('How many hour/s before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setRequired(true))),
    async execute(interaction) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');
            const list = [];
            const add = new ButtonBuilder()
                .setCustomId('add')
                .setLabel('add me in')
                .setStyle(ButtonStyle.Primary);

            const remove = new ButtonBuilder()
                .setCustomId('remove')
                .setLabel('remove')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(add, remove);

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(title)
                .setDescription(question + "?")
                .setTimestamp()
                .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });

            // console.log(list.length);
            // console.log(list.length == 0);
            // console.log(list.length === 0);



            if (list.length !== 0) {
                exampleEmbed.addFields(
                    { name: '01', value: ".", inline: true },
                    { name: '02', value: "." },
                    { name: '03', value: "." }
                );
            }
            else {
                exampleEmbed.addFields(
                    { name: 'No one yet', value: "\u200B", inline: true },
                );
            }

            const response = await interaction.reply({ embeds: [exampleEmbed], files: [file], components: [row] });
            const collectorFilter = i => i.user.id === interaction.user.id;
            try {
                // const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });
                console.log(confirmation.customId);
                if (confirmation.customId === 'add') {
                    list.push(interaction.user.username);
                    console.log(list);
                    const listEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(title)
                        .setDescription(question + "?")
                        .setTimestamp()
                        .addFields({ name: list[0], value: "\u200B", inline: true })
                        .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });

                    await confirmation.update({ embeds: [listEmbed], files: [file], components: [row] });
                }
                else if (confirmation.customId === 'remove') {

                }
            } catch (e) {
                console.log(e);
                exampleEmbed.setDescription('Confirmation not received within x minute, cancelling').setFields();
                await interaction.editReply({ embeds: [exampleEmbed], files: [file] });
            }
        }
    },
};

