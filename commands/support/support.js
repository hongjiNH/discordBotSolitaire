const errorEmbed =require('../../share/embed/errorEmbed');
const file=require('../../share/file')

const commonVariable=require('../../share/index');

const { SlashCommandBuilder  } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.support)
		.setDescription("Discord support server for " + commonVariable.botName),
	async execute(interaction) {
		errorEmbed.data
		.setTitle("Support server")
		.setDescription("Contact the support by joining " )
		.setFields({ name: 'Support Server', value: commonVariable.supportLink, inline: true })
		

		return interaction.reply({ embeds: [errorEmbed.data], files: [file] });
	},
};