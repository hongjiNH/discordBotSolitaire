require('dotenv').config();

const support = process.env.support
const botName = process.env.botName


const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription("Discord support server for " + botName),
	async execute(interaction) {
		return interaction.reply("Contact the support by joining the following server: " + support);
	},
};