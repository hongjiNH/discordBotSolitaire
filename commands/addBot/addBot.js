const commonVariable = require('../../share/index');

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.addbot)
		.setDescription("Adding " + commonVariable.botName + ' to other server'),

	async execute(interaction) {

		const defaultEmbed = new EmbedBuilder()
			.setColor(commonVariable.defaultEmbedColorCode)
			.setTimestamp()
			.setFooter(commonVariable.embedFooter)
			
			.setTitle('This bot is set to have admin rigth .');

		const urlButton = new ButtonBuilder()
			.setLabel('Invite now')
			.setURL(commonVariable.addBotUrl)
			.setStyle(ButtonStyle.Link);

		const row = new ActionRowBuilder()
			.addComponents(urlButton);

		return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file], components: [row] });
	},
};