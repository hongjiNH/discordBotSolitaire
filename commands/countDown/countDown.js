const calculateTime = require('../../share/calculateTime');
const defaultEmbed = require('../../share/embed/defaultEmbed');
const file = require('../../share/file')
const formatTime = require('../../share/formatTime');
const conmmonVariable = require('../../share/index');

const interval = 60000;

const { SlashCommandBuilder, userMention, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.countdown)
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
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('directmessage')
                    .setDescription("Set to false if you dont want to be direct messaged at completion")
                    .setRequired(true))
                .addIntegerOption(option => option.setName('days')
                    .setDescription('How many day(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(30))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour(s)')
                    .setMinValue(1)
                    .setMaxValue(24))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setMinValue(1)
                    .setMaxValue(60)))
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
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('directmessage')
                    .setDescription("Set to false if you dont want to be direct messaged at completion")
                    .setRequired(true))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(24))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setMinValue(1)
                    .setMaxValue(60)))
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
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('directmessage')
                    .setDescription("Set to false if you dont want to be direct messaged at completion")
                    .setRequired(true))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60)))
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
                .addBooleanOption(option => option.setName('public')
                    .setDescription("Set to false if you dont want others to see this")
                    .setRequired(true))
                .addBooleanOption(option => option.setName('directmessage')
                    .setDescription("Set to false if you dont want to be direct messaged at completion")
                    .setRequired(true))
                .addIntegerOption(option => option.setName('weeks')
                    .setDescription('How many week(s)')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(60))
                .addIntegerOption(option => option.setName('days')
                    .setDescription('How many day(s)')
                    .setMinValue(1)
                    .setMaxValue(30))
                .addIntegerOption(option => option.setName('hours')
                    .setDescription('How many hour(s)')
                    .setMinValue(1)
                    .setMaxValue(24))
                .addIntegerOption(option => option.setName('minutes')
                    .setDescription('How many mintue(s)')
                    .setMinValue(1)
                    .setMaxValue(60))
        ),

    async execute(interaction, client) {

        const messagestart = interaction.options.getString('messagestart');
        const messageend = interaction.options.getString('messageend');
        const public = interaction.options.getBoolean('public');
        const directmessage = interaction.options.getBoolean('directmessage');

        let timeInMilliseconds = calculateTime(interaction.options?.getInteger('weeks'), interaction.options?.getInteger('days'), interaction.options?.getInteger('hours'), interaction.options.getInteger('minutes'));

        let response='';

        defaultEmbed.data
            .setDescription('\u200b')
            .setFields({ name: "Your message", value: messagestart })


        const closeButton = new ButtonBuilder()
            .setCustomId('closerForm_' + conmmonVariable.solitaire)
            .setLabel('close')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(closeButton);

        switch (interaction.options._subcommand) {
            case 'day':
                timeInMilliseconds =
                    defaultEmbed.data.setTitle("Your count down timer is set to: " + formatTime(timeInMilliseconds));
                break;
            case 'hour':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + formatTime(timeInMilliseconds));
                break;
            case 'minute':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + formatTime(timeInMilliseconds));
                break;
            case 'week':
                defaultEmbed.data.setTitle("Your count down timer is set to: " + formatTime(formatTime(timeInMilliseconds)));
                break;
        }

        if (public === false) {
           response= await interaction.reply({ embeds: [defaultEmbed.data], files: [file], components: [row], ephemeral: true });
        }
        else {
            response= await interaction.reply({ embeds: [defaultEmbed.data], files: [file], components: [row] });
        }

        let countdown = timeInMilliseconds;


        const endFormFunction=()=>{
            
            closeButton.setDisabled(true);
            clearInterval(countdownInterval);

            defaultEmbed.data.setTitle('Count down timer has stop.').setFields({ name: 'Your message', value: messageend });

            if (public === false) {

                if (directmessage === true) {
                    // user wanted to receive it in their dm
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed.data] });
                    });
                }
                interaction.editReply({ embeds: [defaultEmbed.data], components: [row], ephemeral: true });
            }
            else {

                //user wanted to receive it publicly in the channel
                if (directmessage === true) {
                    //user  wanted ot receive it in their dm
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed.data] });
                    });
                }

                interaction.editReply({ embeds: [defaultEmbed.data], components: [row] });
            }

        }

        const countdownInterval = setInterval(() => {

            countdown -= interval;

            const remainingTime = formatTime(countdown);

            defaultEmbed.data
                .setTitle(`Countdown: ${remainingTime} remaining.`)
                .setFields({ name: "Your message", value: messagestart });

            interaction.editReply({ embeds: [defaultEmbed.data] });

            if (countdown <= 0) {
                endFormFunction();
            }


        }, interval)

        
        while (countdown >= 0) {
            const confirmation = await response.awaitMessageComponent();

            if (confirmation.customId === 'closerForm_' + conmmonVariable.solitaire) {
                countdown = 0;
                endFormFunction();
            }

            await confirmation.update({ embeds: [defaultEmbed.data], files: [file], components: [row] });

        }


     


    },

};