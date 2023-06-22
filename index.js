require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const file = require('./share/file');
const changeStatus = require('./botActivity/botActivity')
const commonVariable = require('./share/index');
const autoUpdate = require('./deploy-commands')

const { Client, Collection, Events, GatewayIntentBits,EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const token = process.env.token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Grab all the command/clash of clan folders from the commands directory you created earlier
const clashOfClanPath = path.join(__dirname, 'commands/clashOfClan');
const clashOfClanCommandFolders = fs.readdirSync(clashOfClanPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);

	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);

		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

}

// for coc command
for (const folder of clashOfClanCommandFolders) {
	const commandsPath = path.join(clashOfClanPath, folder);

	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);

		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

}



client.once(Events.ClientReady, c => {

	console.log(`Ready! Logged in as ${c.user.tag}`);

	const Guilds = client.guilds.cache.map(guild => guild.id);

	autoUpdate();

	changeStatus(client, Guilds);

	setInterval(() => {
		changeStatus(client, Guilds);
	}, 2 * 60 * 60 * 1000);

});

client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {

		console.error(error);

		const errorEmbed = new EmbedBuilder()
			.setColor(commonVariable.errorEmbedColorCode)
			.setTimestamp()
			.setFooter(commonVariable.embedFooter)

			.setTitle("Support server")
			.setDescription("Contact the support by joining ")

		const urlButton = new ButtonBuilder()
			.setLabel('Join now')
			.setURL(commonVariable.supportLink)
			.setStyle(ButtonStyle.Link);

		const row = new ActionRowBuilder()
			.addComponents(urlButton);

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ embeds: [errorEmbed], files: [file], ephemeral: true, components: [row] });
		} else {
			await interaction.reply({ embeds: [errorEmbed], files: [file], ephemeral: true, components: [row] });
		}
	}
});

client.login(token);