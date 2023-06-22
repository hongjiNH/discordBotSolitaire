const defaultEmbed =require('../../share/embed/defaultEmbed');
const file=require('../../share/file')
const commonVariable=require('../../share/index');

const { SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.addbot)
		.setDescription("Adding "+commonVariable.botName+' to other server'),
	async execute(interaction) {
		defaultEmbed.data
		.setTitle("Bot say...")
		.setFields({name:'URL',value:commonVariable.addBotUrl})
		.setDescription('This bot is set to have admin rigth .');

		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};