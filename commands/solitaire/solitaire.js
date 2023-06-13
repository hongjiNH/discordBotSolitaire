require('dotenv').config();

const botName = process.env.botName

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_solitaire')
        .setDescription("Ask a question and allowing user to click to add their username in " + botName)
        .addStringOption(option => option.setName('title')
            .setDescription('The question of this')
            .setRequired(true))
        .addStringOption(option => option.setName('question')
            .setDescription('The question of this')
            .setRequired(true)),
    async execute(interaction) {
        {
            const title = interaction.options.getString('title');
            const question = interaction.options.getString('question');
            console.log(title);
            console.log(question);
            
            const list = [];
            if (list.length == 0) {
                await interaction.reply("No one is on the list now, click on add me button to add your name")


            }
            else {

            }
        }
    },
};