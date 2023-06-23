// const commonVariable = require('../../../share/index');
// const cocClient = require('../../../share/coc/cocClientLogin');
// const formatTime = require('../../../share/formatTime');
// const calculateTime = require('../../../share/calculateTime');

// const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");


// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName(commonVariable.cocCreateList)
//         .setDescription("Ask a question and allowing user to click to add their clash of clan username in ")
//         .addSubcommand(subcommand =>
//             subcommand
//                 .setName('day')
//                 .setDescription('How many day(s) before this application is close')
//                 .addStringOption(option => option.setName('clantag')
//                     .setDescription('Enter your clan tag etc #2PPP')
//                     .setMaxLength(10)
//                     .setMinLength(10)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('title')
//                     .setDescription('Title of this question')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('question')
//                     .setDescription('The question of this')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addBooleanOption(option => option.setName('directmessage')
//                     .setDescription("Set to false if you dont want to be direct messaged at completion")
//                     .setRequired(true))
//                 .addIntegerOption(option => option.setName('days')
//                     .setDescription('How many day(s)')
//                     .setRequired(true)
//                     .setMinValue(1)
//                     .setMaxValue(30))
//                 .addIntegerOption(option => option.setName('hours')
//                     .setDescription('How many hour(s)')
//                     .setMinValue(1)
//                     .setMaxValue(24))
//                 .addIntegerOption(option => option.setName('minutes')
//                     .setDescription('How many mintue(s)')
//                     .setMinValue(1)
//                     .setMaxValue(60))
//                 .addRoleOption(option => option.setName('role')
//                     .setDescription("Mention a role ")))
//         .addSubcommand(subcommand =>
//             subcommand
//                 .setName('hour')
//                 .setDescription('How many hour(s) before this application is close')
//                 .addStringOption(option => option.setName('clantag')
//                     .setDescription('Enter your clan tag etc #2PPP')
//                     .setMaxLength(10)
//                     .setMinLength(10)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('title')
//                     .setDescription('Title of this question')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('question')
//                     .setDescription('The question of this')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addBooleanOption(option => option.setName('directmessage')
//                     .setDescription("Set to false if you dont want to be direct messaged at completion")
//                     .setRequired(true))
//                 .addIntegerOption(option => option.setName('hours')
//                     .setDescription('How many hour(s)')
//                     .setRequired(true)
//                     .setMinValue(1)
//                     .setMaxValue(24))
//                 .addIntegerOption(option => option.setName('minutes')
//                     .setDescription('How many mintue(s)')
//                     .setMinValue(1)
//                     .setMaxValue(60))
//                 .addRoleOption(option => option.setName('role')
//                     .setDescription("Mention a role ")))
//         .addSubcommand(subcommand =>
//             subcommand
//                 .setName('minute')
//                 .setDescription('How many minute(s) before this application is close')
//                 .addStringOption(option => option.setName('clantag')
//                     .setDescription('Enter your clan tag etc #2PPP')
//                     .setMaxLength(10)
//                     .setMinLength(10)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('title')
//                     .setDescription('Title of this question')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addStringOption(option => option.setName('question')
//                     .setDescription('The question of this')
//                     .setMaxLength(100)
//                     .setRequired(true))
//                 .addBooleanOption(option => option.setName('directmessage')
//                     .setDescription("Set to false if you dont want to be direct messaged at completion")
//                     .setRequired(true))
//                 .addIntegerOption(option => option.setName('minutes')
//                     .setDescription('How many mintue(s)')
//                     .setRequired(true)
//                     .setMinValue(1)
//                     .setMaxValue(60))
//                 .addRoleOption(option => option.setName('role')
//                     .setDescription("Mention a role "))),

//     async execute(interaction, client) {
//         {
//             const clanTag = interaction.options.getString('clantag');

//             try {

//                 const clan = await cocClient.cocClientLogin.getClan(clanTag);

//                 console.log(clan.name)

//                 const defaultEmbed = new EmbedBuilder()
//                 .setColor(commonVariable.defaultEmbedColorCode)
//                 .setTimestamp()
//                 .setFooter(commonVariable.embedFooter)

//                 const title = interaction.options.getString('title');
//                 const question = interaction.options.getString('question');
//                 const directmessage = interaction.options.getBoolean('directmessage');
//                 const role = interaction.options.getRole('role');
//                 console.log(interaction.options.getRole('role') !== null);
    
//                 let list = [];
//                 let temList = [];
    
//                 let timeInMilliseconds = calculateTime(null, interaction.options?.getInteger('days'), interaction.options?.getInteger('hours'), interaction.options.getInteger('minutes'));
    
//                 defaultEmbed.setTitle(title + "  will close in " + formatTime(timeInMilliseconds));
                
//                 const addButton = new ButtonBuilder()
//                     .setCustomId('addUser_' + commonVariable.solitaire)
//                     .setLabel('add me in')
//                     .setStyle(ButtonStyle.Primary);
    
//                 const removeButton = new ButtonBuilder()
//                     .setCustomId('removeUser_' + commonVariable.solitaire)
//                     .setLabel('remove')
//                     .setStyle(ButtonStyle.Danger);
    
//                 const closeButton = new ButtonBuilder()
//                     .setCustomId('closerForm_' + commonVariable.solitaire)
//                     .setLabel('close')
//                     .setStyle(ButtonStyle.Danger);
    
//                 const row = new ActionRowBuilder()
//                     .addComponents(addButton, removeButton, closeButton);
    
//                 if (role !== null) {
//                     defaultEmbed.setDescription(question + "? " + role.name + ' Check out this list');
//                 }
//                 else {
//                     defaultEmbed.setDescription(question + "?");
//                 }
    
//                 defaultEmbed.setFields(
//                     { name: 'No one yet', value: "\u200B", inline: true },
//                 );
    
//                 const response = await interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
    
//                 let countdown = timeInMilliseconds;
    
//                 const countdownInterval = setInterval(() => {
    
//                     countdown -= interval;
    
//                     const remainingTime = formatTime(countdown);
    
//                     defaultEmbed
//                         .setTitle(`${title}, Countdown: ${remainingTime} remaining.`)
//                         .setDescription(question + ' ?');
    
//                     interaction.editReply({ embeds: [defaultEmbed] });
    
//                     if (countdown <= 0) {
//                         endFormFunction();
    
//                     }
//                 }, commonVariable.interval)
    
//                 const endFormFunction = () => {
    
//                     clearInterval(countdownInterval);
//                     addButton.setDisabled(true);
//                     removeButton.setDisabled(true);
//                     closeButton.setDisabled(true);
    
//                     defaultEmbed.setTitle(title + " is close  ").setFields();
    
//                     if (list.length !== 0) {
//                         for (let i = 0; i < list.length; i++) {
//                             defaultEmbed.addFields(
//                                 { name: i + 1 + ") " + list[i], value: "\u200B", inline: true },
//                             );
//                         }
//                     }
//                     else {
//                         defaultEmbed.setFields(
//                             { name: 'No one yet', value: "\u200B", inline: true },
//                         );
//                     }
    
//                     interaction.editReply({ embeds: [defaultEmbed], components: [row] });
    
//                     if (directmessage === true) {
//                         client.users.fetch(interaction.user.id, false).then((user) => {
//                             user.send({ embeds: [defaultEmbed] });
//                         })
//                     }
//                 }
    
//                 while (countdown >= 0) {
    
//                     const confirmation = await response.awaitMessageComponent();
    
//                     if (confirmation.customId === 'addUser_' + commonVariable.solitaire) {
//                         if (list.indexOf(confirmation.user.username) === -1) {
//                             list.push(confirmation.user.username);
//                         }
//                     }
//                     else if (confirmation.customId === 'removeUser_' + commonVariable.solitaire) {
    
//                         if (list.indexOf(confirmation.user.username) !== -1) {
    
//                             list.map(name => name === confirmation.user.username ? '' : temList.push(name));
//                             list = [];
//                             temList.map(name => list.push(name));
//                             temList = [];
//                         }
//                     }
//                     else if (confirmation.customId === 'closerForm_' + commonVariable.solitaire) {
    
//                         countdown = 0;
//                         endFormFunction();
//                     }
    
//                     if (confirmation.customId !== 'closerForm_' + commonVariable.solitaire) {
//                         defaultEmbed
//                             .setTitle(`${title}, Countdown: ${formatTime(countdown)} remaining.`)
//                             .setDescription(question + ' ?')
//                             .setFields();
    
//                         if (list.length !== 0) {
//                             for (let i = 0; i < list.length; i++) {
//                                 defaultEmbed.addFields(
//                                     { name: i + 1 + ")  " + list[i], value: "\u200B", inline: true },
//                                 );
//                             }
//                         }
    
//                         else {
//                             defaultEmbed.setFields(
//                                 { name: 'No one yet', value: "\u200B", inline: true },
//                             );
//                         }
    
//                     }
    
//                     await confirmation.update({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
    
//                 }


//             }
//             catch (error) {

//                 if (error.status == 500 || error.status === 403) {

//                     const urlButton = new ButtonBuilder()
//                         .setLabel('Join now')
//                         .setURL(commonVariable.supportLink)
//                         .setStyle(ButtonStyle.Link);

//                     const row = new ActionRowBuilder()
//                         .addComponents(urlButton);

//                     return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [commonVariablefile], components: [row] });

//                 }
//                 else {
//                     return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [commonVariable.file] });

//                 }

//             }
       
//         }
//     },

// };
