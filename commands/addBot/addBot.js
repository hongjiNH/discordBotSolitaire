const defaultEmbed =require('../../share/embed/defaultEmbed');
const file=require('../../share/file')
const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(conmmonVariable.addbot)
		.setDescription("Adding "+conmmonVariable.botName+' to other server'),
	async execute(interaction) {
		defaultEmbed.data
		.setTitle("Bot say...")
		.setFields({name:'URL',value:conmmonVariable.addBotUrl})
		.setDescription('This will is set to have admin rigth .');

		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};