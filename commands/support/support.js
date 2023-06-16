const errorEmbed =require('../../share/errorEmbed');
const file=require('../../share/file')

const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder  } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription("Discord support server for " + conmmonVariable.botName),
	async execute(interaction) {
		errorEmbed.data
		.setTitle("Support server")
		.setDescription("Contact the support by joining " )
		.setFields({ name: 'Support Server', value: conmmonVariable.support, inline: true })
		

		return interaction.reply({ embeds: [errorEmbed.data], files: [file] });
	},
};