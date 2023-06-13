require('dotenv').config();

const version = process.env.version

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription("Version of the current bot "),
	async execute(interaction) {
		return interaction.reply("The current version of the bot is: " + version);
	},
};