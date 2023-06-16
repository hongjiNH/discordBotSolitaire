const defaultEmbed = require('../../share/defaultEmbed');
const file = require('../../share/file');
const { botName, logo } = require('../../share/index');
const formatTime = require('../../share/formatTime');

const interval = 60000;

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, userMention } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('solitaire')
        .setDescription("Ask a question and allowing user to click to add their username in " + botName)
        .addSubcommand(subcommand =>
            subcommand
                .setName('day')
                .setDescription('How many day/s before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setMaxLength(100)
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
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour/s')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(24)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('minute')
                .setDescription('How many minute(s) before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60))),

    async execute(interaction, client) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');

            const hour = interaction.options.getInteger('hours');
            const day = interaction.options.getInteger('days');
            const minute = interaction.options.getInteger('minutes');

            const list = [];

            let timeInMilliseconds = 0;


            switch (interaction.options._subcommand) {
                case 'day':
                    defaultEmbed.data.setTitle(title + "  will close in " + interaction.options.getInteger('days') + ' day(s)');
                    timeInMilliseconds += interaction.options.getInteger('days') * 24 * 60 * 60 * 1000;
                    break;
                case 'hour':
                    defaultEmbed.data.setTitle(title + "  will close in " + interaction.options.getInteger('hours') + ' hour(s)');
                    timeInMilliseconds += interaction.options.getInteger('hours') * 60 * 60 * 1000;
                    break;
                case 'minute':
                    defaultEmbed.data.setTitle(title + "  will close in " + interaction.options.getInteger('minutes') + ' minute(s)');
                    timeInMilliseconds += interaction.options.getInteger('minutes') * 60 * 1000;
                    break;
            }


            const addButton = new ButtonBuilder()
                .setCustomId('add')
                .setLabel('add me in')
                .setStyle(ButtonStyle.Primary);

            const removeButton = new ButtonBuilder()
                .setCustomId('remove')
                .setLabel('remove')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(addButton, removeButton);

            defaultEmbed.data.setDescription(question + "?");

            defaultEmbed.data.setFields(
                { name: 'No one yet', value: "\u200B", inline: true },
            );

            const response = await interaction.reply({ embeds: [defaultEmbed.data], files: [file], components: [row] });


            // setTimeout(() => {
            //     // Disable the add and remove buttons
            //     addButton.setDisabled(true);
            //     removeButton.setDisabled(true);
            //     defaultEmbed.data
            //         .setTitle(title + " is close  ")
            //         .setFields();
            //     if (list.length !== 0) {
            //         for(let i =0;i <list.length;i++){
            //             defaultEmbed.data.addFields(
            //                 { name: i+" "+list[i], value: "\u200B", inline: true },
            //             );
            //         }
            //     }
            //     else {
            //         defaultEmbed.data.addFields(
            //             { name: 'No one yet', value: "\u200B", inline: true },
            //         );
            //     }
            //     // Update the message with the disabled buttons
            //     interaction.editReply({ components: [defaultEmbed.data] });
            // },timeInMilliseconds);

            let countdown = timeInMilliseconds;

            const countdownInterval = setInterval(() => {

                countdown -= interval;

                const remainingTime = formatTime(countdown);

                defaultEmbed.data
                    .setTitle(`${title}, Countdown: ${remainingTime} remaining.`)
                    .setDescription(question + ' ?');

                interaction.editReply({ embeds: [defaultEmbed.data] });

                if (countdown <= 0) {

                    clearInterval(countdownInterval);

                    addButton.setDisabled(true);
                    removeButton.setDisabled(true);

                    defaultEmbed.data.setTitle(title + " is close  ").setFields();

                    if (list.length !== 0) {
                        for (let i = 0; i < list.length; i++) {
                            defaultEmbed.data.addFields(
                                { name: i + 1 + ") " + list[i], value: "\u200B", inline: true },
                            );
                        }
                    }
                    else {
                        defaultEmbed.data.setFields(
                            { name: 'No one yet', value: "\u200B", inline: true },
                        );
                    }

                    interaction.editReply({ embeds: [defaultEmbed.data], components: [row] });

                    // if (public === false) {
                    //     // user wanted to receive privately, in the channel
                    //     if (alert === false) {
                    //         interaction.editReply({ embeds: [defaultEmbed.data], ephemeral: true });
                    //     }
                    //     else {
                    //         // user wanted to receive it in their dm
                    //         client.users.fetch(interaction.user.id, false).then((user) => {
                    //             user.send({ embeds: [defaultEmbed.data]});
                    //            });

                    //            interaction.editReply({ embeds: [defaultEmbed.data], ephemeral: true });
                    //     }
                    // }
                    // else {
                    //     //user wanted to receive it publicly in the channel
                    //     if (alert === false) {
                    //         interaction.editReply({ embeds: [defaultEmbed.data] });
                    //     }
                    //     else {
                    //         //user  wanted ot receive it in their dm
                    //         client.users.fetch(interaction.user.id, false).then((user) => {
                    //             user.send({ embeds: [defaultEmbed.data]});
                    //            });

                    //            interaction.editReply({ embeds: [defaultEmbed.data] });
                    //     }

                    //     interaction.editReply({ embeds: [defaultEmbed.data] });
                    // }

                }
                else {

                }
            }, interval)


            const collectorFilter = i => i.user.id === interaction.user.id;
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

            if (confirmation.customId === 'add') {
                list.push(interaction.user.username);
                console.log(list);

                defaultEmbed.data
                    .setTitle(`${title}, Countdown: ${formatTime(countdown)} remaining.`)
                    .setDescription(question + ' ?')
                    .setFields();

                if (list.length !== 0) {
                    for (let i = 0; i < list.length; i++) {
                        defaultEmbed.data.addFields(
                            { name: i + 1 + ")  " + list[i], value: "\u200B", inline: true },
                        );
                    }
                }

                await confirmation.update({ embeds: [defaultEmbed.data], files: [file], components: [row] });
                await interaction.editReply({ embeds: [defaultEmbed.data], files: [file], components: [row] });

            }
            else if (confirmation.customId === 'remove') {
             
            }

            // try {

            //     // const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
            //     const collectorFilter = i => i.user.id === interaction.user.id;
            //     const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

            //     if (confirmation.customId === 'add') {
            //         list.push(interaction.user.username);
            //         console.log(list);
            //         const listEmbed = new EmbedBuilder()
            //             .setColor(0x0099FF)
            //             .setDescription(question + "?")
            //             .setTimestamp()
            //             .setFields({ name: "-0 " + list[0], value: "\u200B", inline: true })
            //             .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://' + logo });

            //         if (hour === null) {
            //             listEmbed.setTitle(title + "  will end on " + day + " day/s")
            //         }
            //         else {
            //             listEmbed.setTitle(title + "  will end on " + hour + " hour/s")
            //         }


            //         await confirmation.update({ embeds: [listEmbed], files: [file], components: [row] });
            //     }
            //     else if (confirmation.customId === 'remove') {

            //     }
            // } catch (e) {
            //     console.log(e);
            //     defaultEmbed.data.setDescription('Confirmation not received within x minute, cancelling').setFields();
            //     await interaction.editReply({ embeds: [defaultEmbed.data], files: [file] });
            // }
        }
    },

};

