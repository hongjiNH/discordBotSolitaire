const commonVariable = require('../../share/index');
const formatTime = require('../../share/formatTime');
const intervalCheck = require('../../share/intervalChecking');
const calculateTime = require('../../share/calculateTime');

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commonVariable.solitaire)
        .setDescription("Ask a question and allowing user to click to add their username in ")
        .addSubcommand(subcommand =>
            subcommand
                .setName('day')
                .setDescription('How many day(s) before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setMaxLength(100)
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
                    .setMaxValue(60))
                .addRoleOption(option => option.setName('role')
                    .setDescription("Mention a role ")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('hour')
                .setDescription('How many hour(s) before this application is close')
                .addStringOption(option => option.setName('title')
                    .setDescription('Title of this question')
                    .setMaxLength(100)
                    .setRequired(true))
                .addStringOption(option => option.setName('question')
                    .setDescription('The question of this')
                    .setMaxLength(100)
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
                    .setMaxValue(60))
                .addRoleOption(option => option.setName('role')
                    .setDescription("Mention a role ")))
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
                    .setMinValue(1))
                .addRoleOption(option => option.setName('role')
                    .setDescription("Mention a role "))),

    async execute(interaction, client) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');
            const directmessage = interaction.options.getBoolean('directmessage');
            const role = interaction.options.getRole('role');
            // console.log(interaction.options.getRole('role')!==null);

            let list = [];
            let temList = [];

            let timeInMilliseconds = calculateTime(null, interaction.options?.getInteger('days'), interaction.options?.getInteger('hours'), interaction.options.getInteger('minutes'));

            const defaultEmbed = new EmbedBuilder()
                .setColor(commonVariable.defaultEmbedColorCode)
                .setTimestamp()
                .setFooter(commonVariable.embedFooter)

            defaultEmbed.setTitle(title + "  will close in " + formatTime(timeInMilliseconds));

            const addButton = new ButtonBuilder()
                .setCustomId('addUser_' + commonVariable.solitaire)
                .setLabel('add me in')
                .setStyle(ButtonStyle.Primary);

            const removeButton = new ButtonBuilder()
                .setCustomId('removeUser_' + commonVariable.solitaire)
                .setLabel('remove')
                .setStyle(ButtonStyle.Danger);

            const closeButton = new ButtonBuilder()
                .setCustomId('closerForm_' + commonVariable.solitaire)
                .setLabel('close')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(addButton, removeButton, closeButton);

            if (role !== null) {
                defaultEmbed.setDescription(question + "? " + role.name + ' Check out this list');
            }
            else {
                defaultEmbed.setDescription(question + "?");
            }

            defaultEmbed.setFields(
                { name: 'No one yet', value: "\u200B", inline: true },
            );

            const response = await interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });

            let countdown = timeInMilliseconds;

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
                    .setTitle(`${title}, Countdown: ${remainingTime} remaining.`)
                    .setDescription(question + ' ?');

                interaction.editReply({ embeds: [defaultEmbed] });

                if (countdown <= 0) {
                    endFormFunction();

                }
            }, currentInterval)

            const addUserInList = () => {


                if (list.length !== 0) {
                    for (let i = 0; i < list.length; i++) {
                        defaultEmbed.addFields(
                            { name: i + 1 + ")  " + list[i], value: "\u200B", inline: true },
                        );
                    }
                }

                else {
                    defaultEmbed.setFields(
                        { name: 'No one yet', value: "\u200B", inline: true },
                    );
                }
            }

            const endFormFunction = () => {

                clearInterval(countdownInterval);
                addButton.setDisabled(true);
                removeButton.setDisabled(true);
                closeButton.setDisabled(true);

                defaultEmbed.setTitle(title + " is close  ").setFields();

                addUserInList();

                interaction.editReply({ embeds: [defaultEmbed], components: [row] });

                if (directmessage === true) {
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed] });
                    })
                }
            }

            while (countdown >= 0) {

                const confirmation = await response.awaitMessageComponent();

                const notClosingForm = async () => {
                    defaultEmbed
                        .setTitle(`${title}, Countdown: ${formatTime(countdown)} remaining.`)
                        .setDescription(question + ' ?')
                        .setFields();

                    addUserInList();

                    await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
                }

                if (confirmation.customId === 'addUser_' + commonVariable.solitaire) {
                    if (list.indexOf(confirmation.user.username) === -1) {
                        list.push(confirmation.user.username);

                        notClosingForm();

                    }
                    else {

                        await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });

                        const wrongUserEmbed = new EmbedBuilder()
                            .setColor(commonVariable.errorEmbedColorCode)
                            .setTimestamp()
                            .setFooter(commonVariable.embedFooter)
                            .setDescription('How to add you when you are already in the list ...')

                        await confirmation.followUp({ embeds: [wrongUserEmbed], files: [commonVariable.file], ephemeral: true })
                    }
                }
                else if (confirmation.customId === 'removeUser_' + commonVariable.solitaire) {

                    if (list.indexOf(confirmation.user.username) !== -1) {

                        list.map(name => name === confirmation.user.username ? '' : temList.push(name));
                        list = [];
                        temList.map(name => list.push(name));
                        temList = [];

                        notClosingForm();
                    }
                    else {

                        await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });

                        const wrongUserEmbed = new EmbedBuilder()
                            .setColor(commonVariable.errorEmbedColorCode)
                            .setTimestamp()
                            .setFooter(commonVariable.embedFooter)
                            .setDescription('How to remove when you are not in the list ...')

                        await confirmation.followUp({ embeds: [wrongUserEmbed], files: [commonVariable.file], ephemeral: true })
                    }
                }
                else if (confirmation.customId === 'closerForm_' + commonVariable.solitaire) {

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
        }
    },
};
