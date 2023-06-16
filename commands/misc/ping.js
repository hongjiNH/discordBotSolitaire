const defaultEmbed =require('../../share/defaultEmbed');
const file=require('../../share/file')
const conmmonVariable=require('../../share/index');

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(conmmonVariable.ping)
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		defaultEmbed.data.setDescription('Pong').setFields().setTitle("Bot say ...");
		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};