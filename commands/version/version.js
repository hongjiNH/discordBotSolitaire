require('dotenv').config();
const defaultEmbed =require('../../share/defaultEmbed');
const file=require('../../share/file')

const version = process.env.version

const { SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription("Version of the current bot "),
	async execute(interaction) {
		defaultEmbed.data
		.setTitle("Version")
		.setFields()
		.setDescription("The current version of the bot is: " + `**${version}**`)

		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};