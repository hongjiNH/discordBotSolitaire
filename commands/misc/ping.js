const defaultEmbed =require('../../share/embed/defaultEmbed');
const file=require('../../share/file')
const commonVariable=require('../../share/index');

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.ping)
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		
		defaultEmbed.data
		.setDescription('Pong')
		.setFields()
		.setTitle("Bot say ...");

		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};