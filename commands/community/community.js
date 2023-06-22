const errorEmbed =require('../../share/embed/errorEmbed');
const file=require('../../share/file')

const commonVariable=require('../../share/index');

const { SlashCommandBuilder  } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.community)
		.setDescription("@nothealthy community server " ),
	async execute(interaction) {
		errorEmbed.data
		.setTitle("Community server")
		.setDescription("Contact the support by joining " )
		.setFields({ name: 'Community Server', value: commonVariable.communityLink, inline: true })
		

		return interaction.reply({ embeds: [errorEmbed.data], files: [file] });
	},
};