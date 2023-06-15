
require('dotenv').config();

const logo = process.env.logo

const defaultEmbed = require('../../share/defaultEmbed');
const file = require('../../share/file')
const interver = 60000;

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('countdown')
        .setDescription('Countdown to what you tells it to.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('day')
                .setDescription('How many day/s before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
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
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
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
                .setDescription('How many minute/s before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue/s')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('week')
                .setDescription('How many week/s before this application is close')
                .addStringOption(option => option.setName('messagestart')
                    .setDescription('Custom message before timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('messageend')
                    .setDescription('Custom message after timer')
                    .setMaxLength(100)
                    .setRequired(true))
                .addIntegerOption(option => option.setName('weeks')
                    .setDescription('How many week/s')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60))),
    async execute(interaction) {

        const messagestart = interaction.options.getString('messagestart');
        const messageend = interaction.options.getString('messageend');

        let timeInMilliseconds=0;

        defaultEmbed.data
            .addFields({ name: "Your message", value: messagestart })

        if (interaction.options?.getInteger('hours') !== null && interaction.options?.getInteger('hours') !== "undefined") {
            defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('hours') + ' hour/s');
            timeInMilliseconds += interaction.options.getInteger('hours') * 60 * 60 * 1000;
        }
        else if(interaction.options?.getInteger('minutes') !== null && interaction.options?.getInteger('minutes') !== "undefined") {
            defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.option.getInteger('minutes') + ' minute/s');
            timeInMilliseconds += interaction.option.getInteger('minutes') * 60 * 1000;
        }
        else if(interaction.options?.getInteger('days') !== null && interaction.options?.getInteger('days') !== "undefined") {
            defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.options.getInteger('days') + ' day/s');
            timeInMilliseconds += interaction.options.getInteger('days') * 24 * 60 * 60 * 1000; 
        }
        else if(interaction.options?.getInteger('weeks') !== null && interaction.options?.getInteger('weeks') !== "undefined") {
            defaultEmbed.data.setTitle("Your count down timer is set to: " + interaction.option.getInteger('weeks') + ' week/s');
            timeInMilliseconds += interaction.option.getInteger('weeks') * 7 * 24 * 60 * 60 * 1000; 
        }

        await interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

        let countdown = timeInMilliseconds;

        const countdownInterval = setInterval(() => {
    
            countdown  -= interver;

            const remainingTime = formatTime(countdown);

            defaultEmbed.data.setTitle(`Countdown: ${remainingTime} remaining.`);

            interaction.editReply({ embeds: [defaultEmbed.data] });

            if (countdown <= 0) {
                clearInterval(countdownInterval);

                defaultEmbed.data.setTitle(`Time's up! Countdown finished for ${formattedTime}.`).setDescription(messageend).addFields();
    
                interaction.editReply({ embeds: [defaultEmbed.data] });
            }


        }, interver)
    },
    
};

function formatTime(timeInMilliseconds) {
    const weeks = Math.floor(timeInMilliseconds / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((timeInMilliseconds % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

    let formattedTime = '';
    if (weeks > 0) formattedTime += `${weeks} week(s) `;
    if (days > 0) formattedTime += `${days} day(s) `;
    if (hours > 0) formattedTime += `${hours} hour(s) `;
    if (minutes > 0) formattedTime += `${minutes} minute(s)`;

    return formattedTime.trim();
}