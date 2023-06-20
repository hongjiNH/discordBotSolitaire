const defaultEmbed = require('../../share/embed/defaultEmbed');
const file = require('../../share/file');
const conmmonVariable = require('../../share/index');
const formatTime = require('../../share/formatTime');

const interval = 60000;

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const calculateTime = require('../../share/calculateTime');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.solitaire)
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
                .addRoleOption(option => option.setName('role')
                    .setDescription("Mention a role "))),

    async execute(interaction, client) {
        {

            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');
            const directmessage = interaction.options.getBoolean('directmessage');
            const role = interaction.options.getRole('role').name;

            let list = [];
            let temList = [];



            let timeInMilliseconds = calculateTime(null, interaction.options?.getInteger('days'), interaction.options?.getInteger('hours'), interaction.options.getInteger('minutes'));

            switch (interaction.options._subcommand) {
                case 'day':
                    defaultEmbed.data.setTitle(title + "  will close in " + formatTime(timeInMilliseconds));

                    break;
                case 'hour':
                    defaultEmbed.data.setTitle(title + "  will close in " + formatTime(timeInMilliseconds));
                    break;
                case 'minute':
                    defaultEmbed.data.setTitle(title + "  will close in " + formatTime(timeInMilliseconds));
                    break;
            }
            const addButton = new ButtonBuilder()
                .setCustomId('addUser_' + conmmonVariable.solitaire)
                .setLabel('add me in')
                .setStyle(ButtonStyle.Primary);

            const removeButton = new ButtonBuilder()
                .setCustomId('removeUser_' + conmmonVariable.solitaire)
                .setLabel('remove')
                .setStyle(ButtonStyle.Danger);


            const closeButton = new ButtonBuilder()
                .setCustomId('closerForm_' + conmmonVariable.solitaire)
                .setLabel('close')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(addButton, removeButton, closeButton);

            if (role !== null || role !== undefined) {
                defaultEmbed.data.setDescription(question + "?" +role + ' Check out this list');
            }
            else{
                defaultEmbed.data.setDescription(question + "?" );
            }
          

            defaultEmbed.data.setFields(
                { name: 'No one yet', value: "\u200B", inline: true },
            );

            const response = await interaction.reply({ embeds: [defaultEmbed.data], files: [file], components: [row] });

            let countdown = timeInMilliseconds;

            const countdownInterval = setInterval(() => {

                countdown -= interval;

                const remainingTime = formatTime(countdown);

                defaultEmbed.data
                    .setTitle(`${title}, Countdown: ${remainingTime} remaining.`)
                    .setDescription(question + ' ?');

                interaction.editReply({ embeds: [defaultEmbed.data] });

                if (countdown <= 0) {
                    endFormFunction();

                }
            }, interval)

            const endFormFunction = () => {

                clearInterval(countdownInterval);
                addButton.setDisabled(true);
                removeButton.setDisabled(true);
                closeButton.setDisabled(true);

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

                if (directmessage === true) {
                    client.users.fetch(interaction.user.id, false).then((user) => {
                        user.send({ embeds: [defaultEmbed.data] });
                    })
                }
            }

            while (countdown >= 0) {

                const confirmation = await response.awaitMessageComponent();

                if (confirmation.customId === 'addUser_' + conmmonVariable.solitaire) {
                    if (list.indexOf(confirmation.user.username) === -1) {
                        list.push(confirmation.user.username);
                    }
                }
                else if (confirmation.customId === 'removeUser_' + conmmonVariable.solitaire) {

                    if (list.indexOf(confirmation.user.username) !== -1) {

                        list.map(name => name === confirmation.user.username ? '' : temList.push(name));
                        list = [];
                        temList.map(name => list.push(name));
                        temList = [];
                    }
                }
                else if (confirmation.customId === 'closerForm_' + conmmonVariable.solitaire) {

                    countdown = 0;
                    endFormFunction();
                }

                if (confirmation.customId !== 'closerForm_' + conmmonVariable.solitaire) {
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

                    else {
                        defaultEmbed.data.setFields(
                            { name: 'No one yet', value: "\u200B", inline: true },
                        );
                    }

                }

                await confirmation.update({ embeds: [defaultEmbed.data], files: [file], components: [row] });


            }
        }
    },

};
