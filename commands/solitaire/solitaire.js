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
                    .setRequired(true))
                .addIntegerOption(option => option.setName('days')
                    .setDescription('How many day/s')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(30)))

        .addSubcommand(subcommand =>
            subcommand
                .setName('hour')
                .setDescription('How many hour/s before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setRequired(true))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour/s')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(24))),
    async execute(interaction) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');

            const hour = interaction.options.getInteger('hours');
            const day = interaction.options.getInteger('days');

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
                
                .setDescription(question + "?")
                .setTimestamp()
                .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });

            if(hour===null){
                exampleEmbed.setTitle(title+" Form will end on "+day+" day/s")
            }
            else{
                exampleEmbed.setTitle(title+" Form will end on "+hour+" hour/s")
            }
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
                        .setDescription(question + "?")
                        .setTimestamp()
                        .addFields({ name: list[0], value: "\u200B", inline: true })
                        .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });

                        if(hour===null){
                            listEmbed.setTitle(title+" Form will end on "+day+" day/s")
                        }
                        else{
                            listEmbed.setTitle(title+" Form will end on "+hour+" hour/s")
                        }


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

