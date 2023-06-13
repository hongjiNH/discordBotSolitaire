require('dotenv').config();

const botName = process.env.botName

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription("Ask a question and allowing user to click to add their username in " + botName),
	async execute(interaction) {
		 {
            const list = [];
            if (list.length == 0) {
                await interaction.reply("No one is on the list now, click on add me button to add your name")


            }
            else {

            }
        }
	},
};