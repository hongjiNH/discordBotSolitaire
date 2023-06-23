const commonVariable=require('../../share/index');

const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.version)
		.setDescription("Version of the current bot "),
	async execute(interaction) {

		const defaultEmbed = new EmbedBuilder()
		.setColor(commonVariable.defaultEmbedColorCode)
		.setTimestamp()
		.setFooter(commonVariable.embedFooter)
		
		.setTitle("Version")
		.setFields()
		.setDescription("The current version of the bot is: " + `**${commonVariable.versionNo}**`)

		return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file] });
	},
};