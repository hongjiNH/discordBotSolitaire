const commonVariable=require('../../share/index');

const { SlashCommandBuilder,EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.ping)
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const defaultEmbed = new EmbedBuilder()
		.setColor(commonVariable.defaultEmbedColorCode)
		.setTimestamp()
		.setFooter(commonVariable.embedFooter)
		
		.setDescription('Pong')

		return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file] });
	},
};