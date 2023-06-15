
require('dotenv').config();

const defaultEmbed = require('../../share/defaultEmbed');
const file = require('../../share/file')
const formatTime = require('../../share/formatTime');

const interver = 60000;

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('countdown')
        .setDescription('Countdown to what you tells it to.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('day')
                .setDescription('How many day(s) before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('days')
                    .setDescription('How many day(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(30))
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('alert')
                    .setDescription("Set to false if you dont want to be alerted at completion")
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('hour')
                .setDescription('How many hour(s) before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(24))
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('alert')
                    .setDescription("Set to false if you dont want to be alerted at completion")
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('minute')
                .setDescription('How many minute(s) before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60))
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('alert')
                    .setDescription("Set to false if you dont want to be alerted at completion")
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('week')
                .setDescription('How many week(s) before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('weeks')
                    .setDescription('How many week(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60))
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('alert')
                    .setDescription("Set to false if you dont want to be alerted at completion")
                    .setRequired(true))),

    async execute(interaction) {

        console.log(interaction.options);

        const messagestart = interaction.options.getString('messagestart');
        const messageend = interaction.options.getString('messageend');
        const public = interaction.options.getBoolean('public');
        const alert = interaction.options.getBoolean('alert');

        let timeInMilliseconds = 0;

        defaultEmbed.data
            .setFields({ name: "Your message", value: messagestart })

        switch (interaction.options._subcommand) {
            case 'day':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('days') + ' day(s)');
                timeInMilliseconds += interaction.options.getInteger('days') * 24 * 60 * 60 * 1000;
                break;
            case 'hour':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('hours') + ' hour(s)');
                timeInMilliseconds += interaction.options.getInteger('hours') * 60 * 60 * 1000;
                break;
            case 'minute':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('minutes') + ' minute(s)');
                timeInMilliseconds += interaction.options.getInteger('minutes') * 60 * 1000;
                break;
            case 'week':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('weeks') + ' week(s)');
                timeInMilliseconds += interaction.options.getInteger('weeks') * 7 * 24 * 60 * 60 * 1000;
                break;

        }

        if (public === false) {
            await interaction.reply({ embeds: [defaultEmbed.data], files: [file], ephemeral: true });
        }
        else {
            await interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
        }



        let countdown = timeInMilliseconds;

        const countdownInterval = setInterval(() => {

            countdown -= interver;

            const remainingTime = formatTime(countdown);

            defaultEmbed.data
            .setTitle(`Countdown: ${remainingTime} remaining.`)
            .setFields({ name: "Your message", value: messagestart });
          
            interaction.editReply({ embeds: [defaultEmbed.data] });

            if (countdown <= 0) {
                clearInterval(countdownInterval);

                defaultEmbed.data.setTitle('Count down timer has stop.').setFields({name:'Your message',value:messageend});

                if (public === false) {
                    interaction.editReply({ embeds: [defaultEmbed.data], ephemeral: true });
                }
                else {
                    interaction.editReply({ embeds: [defaultEmbed.data] });
                }

            }


        }, interver)
    },

};