require('dotenv').config();

const version = process.env.version
const botName = process.env.botName

const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require("discord.js");
const pic='pic1.png'
const file = new AttachmentBuilder('../'+botName+'/assets/'+pic);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription("Version of the current bot "),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setDescription("The current version of the bot is: " + `**${version}**`)
			.setTimestamp()
			.setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+pic });
		return interaction.reply({ embeds: [exampleEmbed], files: [file] });
	},
};