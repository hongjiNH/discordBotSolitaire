const file = require('../../share/file')

const commonVariable = require('../../share/index');

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.support)
		.setDescription("Discord support server for " + commonVariable.botName),
	async execute(interaction) {

		const errorEmbed = new EmbedBuilder()
			.setColor(commonVariable.errorEmbedColorCode)
			.setTimestamp()
			.setFooter(commonVariable.embedFooter)

			.setTitle("Support server")
			.setDescription("Contact the support by joining ")

		const urlButton = new ButtonBuilder()
			.setLabel('Join now')
			.setURL(commonVariable.supportLink)
			.setStyle(ButtonStyle.Link);

		const row = new ActionRowBuilder()
			.addComponents(urlButton);

		return interaction.reply({ embeds: [errorEmbed], files: [file], components: [row] });
	},
};