
// require('dotenv').config();

// const botName = process.env.botName;
// const logo=process.env.logo


// const { SlashCommandBuilder, EmbedBuilder,AttachmentBuilder } = require("discord.js");
// const file = new AttachmentBuilder('../'+botName+'/assets/'+logo);

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('countDown')
// 		.setDescription('Countdown to what you tells it to.'),
// 	async execute(interaction) {
// 		const exampleEmbed = new EmbedBuilder()
// 			.setColor(0x0099FF)
// 			.setDescription('Pong')
// 			.setTimestamp()
// 			.setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+logo });
// 		return interaction.reply({ embeds: [exampleEmbed], files: [file] });
// 	},
// };