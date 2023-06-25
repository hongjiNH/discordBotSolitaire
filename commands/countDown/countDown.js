const formatTime = require('../../share/formatTime');
const commonVariable = require('../../share/index');
const calculateTime = require('../../share/calculateTime');
const intervalCheck = require('../../share/intervalChecking');

const { SlashCommandBuilder, userMention, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.countdown)
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
                .addIntegerOption(option => option.setName('interval')
                    .setDescription('The interval (in minute and <days) of to update the timer, default is 1 minutes')
                    .setMinValue(1))
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
                .addIntegerOption(option => option.setName('interval')
                    .setDescription('The interval (in minute and <hours) of to update the timer, default is 1 minutes')
                    .setMinValue(1))
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
                    .setMaxValue(60))
                .addIntegerOption(option => option.setName('interval')
                    .setDescription('The interval (in minute and <minutes) of to update the timer, default is 1 minutes')
                    .setMinValue(1)))
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
                .addIntegerOption(option => option.setName('interval')
                    .setDescription('The interval (in minute and <weeks) of to update the timer, default is 1 minutes')
                    .setMinValue(1))
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

        let response = '';

        const defaultEmbed = new EmbedBuilder()
            .setColor(commonVariable.defaultEmbedColorCode)
            .setTimestamp()
            .setFooter(commonVariable.embedFooter)

            .setFields({ name: "Your message", value: messagestart })

        const closeButton = new ButtonBuilder()
            .setCustomId('closerForm_' + commonVariable.solitaire)
            .setLabel('close')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(closeButton);

        defaultEmbed.setTitle("Your count down timer is set to: " + formatTime(timeInMilliseconds));

        if (public === false) {
            response = await interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row], ephemeral: true });
        }
        else {
            response = await interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
        }

        let countdown = timeInMilliseconds;


        const endFormFunction = () => {

            closeButton.setDisabled(true);
            clearInterval(countdownInterval);

            defaultEmbed.setTitle('Count down timer has stop.').setFields({ name: 'Your message', value: messageend });

            if (public === false) {

                if (directmessage === true) {
                    // user wanted to receive it in their dm
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed] });
                    });
                }
                interaction.editReply({ embeds: [defaultEmbed], components: [row], ephemeral: true });
            }
            else {

                //user wanted to receive it publicly in the channel
                if (directmessage === true) {
                    //user  wanted ot receive it in their dm
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed] });
                    });
                }

                interaction.editReply({ embeds: [defaultEmbed], components: [row] });
            }

        }

        //interval checking part still testing
        let currentInterval = commonVariable.interval;

        if (interaction.options.getInteger('interval') !== null) {

            if (intervalCheck(countdown, interaction.options.getInteger('interval')) === false) {

                const wrongUserEmbed = new EmbedBuilder()
                    .setColor(commonVariable.errorEmbedColorCode)
                    .setTimestamp()
                    .setFooter(commonVariable.embedFooter)
                    .setDescription('The interval u set is bigger then the count down time you set, therefore interval is set automatically to default 1 minute')

                await interaction.followUp({ embeds: [wrongUserEmbed], files: [commonVariable.file], ephemeral: true })

            }
            else {
                currentInterval = intervalCheck(countdown, interaction.options.getInteger('interval'));

            }

        }
        //


        const countdownInterval = setInterval(() => {

            countdown -= currentInterval;

            const remainingTime = formatTime(countdown);

            defaultEmbed
                .setTitle(`Countdown: ${remainingTime} remaining.`)
                .setFields({ name: "Your message", value: messagestart });

            interaction.editReply({ embeds: [defaultEmbed] });

            if (countdown <= 0) {
                endFormFunction();
            }

        }, currentInterval)


        while (countdown >= 0) {
            const confirmation = await response.awaitMessageComponent();

            if (confirmation.customId === 'closerForm_' + commonVariable.solitaire) {

                const userId = confirmation.user.id;
                const guild = interaction.guild;
                const member = await guild.members.fetch(userId);

                const isAdmin = member.permissions.has([PermissionsBitField.Flags.Administrator]);

                if ((interaction.user.id === confirmation.user.id) || (isAdmin === true)) {
                    countdown = 0;
                    endFormFunction();
                    defaultEmbed.addFields({ name: 'Close by', value: 'Manual closse by ' + confirmation.user.username })
                    await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
                }
                else {

                    await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });

                    const wrongUserEmbed = new EmbedBuilder()
                        .setColor(commonVariable.errorEmbedColorCode)
                        .setTimestamp()
                        .setFooter(commonVariable.embedFooter)
                        .setDescription('You cant close if you are not admin or the one who used the command!')

                    await confirmation.followUp({ embeds: [wrongUserEmbed], files: [commonVariable.file], ephemeral: true })

                }
            }
        }
    },

};