require('dotenv').config();

const errorEmbed =require('../../share/errorEmbed');
const file=require('../../share/file')

const support = process.env.support
const botName = process.env.botName

const { SlashCommandBuilder  } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription("Discord support server for " + botName),
	async execute(interaction) {
		errorEmbed.data
		.setTitle("Support server")
		.setDescription("Contact the support by joining " )
		.setFields({ name: 'Support Server', value: support, inline: true })
		

		return interaction.reply({ embeds: [errorEmbed.data], files: [file] });
	},
};