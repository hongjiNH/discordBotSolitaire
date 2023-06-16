const errorEmbed =require('../../share/errorEmbed');
const file=require('../../share/file')

const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder  } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName(conmmonVariable.community)
		.setDescription("@nothealthy community server " ),
	async execute(interaction) {
		errorEmbed.data
		.setTitle("Community server")
		.setDescription("Contact the support by joining " )
		.setFields({ name: 'Community Server', value: conmmonVariable.communityLink, inline: true })
		

		return interaction.reply({ embeds: [errorEmbed.data], files: [file] });
	},
};