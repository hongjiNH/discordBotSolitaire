// require('dotenv').config();

// const defaultEmbed =require('../../../share/embed/defaultEmbed');
// const file=require('../../../share/file')
// const conmmonVariable=require('../../../share/index');
// const cocClient=require('../../../share/cocClientLogin');

// const { SlashCommandBuilder } = require("discord.js");

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName(conmmonVariable.cocWarLog)
// 		.setDescription('checking your Clash Of Clan-clan warlog')
//         .addStringOption(option => option.setName('clantag')
//         .setDescription('Enter your clan tag etc #2PPP')
//         .setMaxLength(10)
//         .setMinLength(10)
//         .setRequired(true)),
// 	async execute(interaction) {

//         const clanTag=interaction.options.getString('clantag');
//         const clan = await cocClient.cocClientLogin.getClan(clanTag);
//         console.log(clan);

//         // const clan = await client.getClanWarLog(clanTag);
//         // console.log(`${clan.name} (${clan.tag})`);
//         // console.log('----------------------------')
//         // console.log(`${clan}`);

// 		defaultEmbed.data.setDescription('Your clan info').setFields({name:'clan name',value:'test' }).setTitle("Bot say ...");

// 		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
// 	},
// };



