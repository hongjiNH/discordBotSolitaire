require('dotenv').config();

const support = process.env.support
const botName = process.env.botName


const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder  } = require("discord.js");
const pic='pic1.png'
const file = new AttachmentBuilder('../'+botName+'/assets/'+pic);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription("Discord support server for " + botName),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setDescription("Contact the support by joining the following server: " + support)
			.setTimestamp()
			.setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+pic });
		return interaction.reply({ embeds: [exampleEmbed], files: [file] });
	},
};