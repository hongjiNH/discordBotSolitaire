const commonVariable=require('../../share/index');

const { SlashCommandBuilder,EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.version)
		.setDescription("Version of the current bot "),
	async execute(interaction) {

		const defaultEmbed = new EmbedBuilder()
		.setColor(commonVariable.defaultEmbedColorCode)
		.setTimestamp()
		.setFooter(commonVariable.embedFooter)
		
		.setTitle("Version")
		.setFields()
		.setDescription("The current version of the bot is: " + `**${commonVariable.versionNo}**`)
		.setFields(
			{name:'New feature v0.0.2',value:'Count Down and List close button can only be lose by user who use that command or admin'},
			{name:'New feature ',value:'fix Clash of clan tag <10'},
			{name:'New feature v0.0.3',value:'Count Down and List add interval now user able to declar interval or default'},
		
			)

		return interaction.reply({ embeds: [defaultEmbed], files: [commonVariable.file] });
	},
};