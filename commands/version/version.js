require('dotenv').config();

const version = process.env.version
const botName = process.env.botName
const logo=process.env.logo

const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require("discord.js");
const file = new AttachmentBuilder('../'+botName+'/assets/'+logo);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription("Version of the current bot "),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setDescription("The current version of the bot is: " + `**${version}**`)
			.setTimestamp()
			.setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+logo });
		return interaction.reply({ embeds: [exampleEmbed], files: [file] });
	},
};