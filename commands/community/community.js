const file = require('../../share/file')
const commonVariable = require('../../share/index');

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.community)
		.setDescription("@nothealthy community server "),
	async execute(interaction) {

		const defaultEmbed = new EmbedBuilder()
			.setColor(commonVariable.defaultEmbedColorCode)
			.setTimestamp()
			.setFooter(commonVariable.embedFooter)

			.setTitle("Community server")

		const urlButton = new ButtonBuilder()
			.setLabel('Join now')
			.setURL(commonVariable.communityLink)
			.setStyle(ButtonStyle.Link);

		const row = new ActionRowBuilder()
			.addComponents(urlButton);

		return interaction.reply({ embeds: [defaultEmbed], files: [file], components: [row] });
	},
};