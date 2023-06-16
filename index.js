require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const errorEmbed=require("./share/errorEmbed");
const file=require('./share/file');

const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder } = require('discord.js');

const token = process.env.token;

const conmmonVariable=require('./share/index');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

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

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction,client);
	} catch (error) {
		
		console.error(error);

		errorEmbed.data
		.setDescription(`There was an error while executing this command!  `)
		.setFields({ name: 'Support Server', value: conmmonVariable.support, inline: true })

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ embeds: [errorEmbed.data], files: [file] ,ephemeral: true });
		} else {
			await interaction.reply({ embeds: [errorEmbed.data], files: [file] ,ephemeral: true });
		}
	}
});

client.login(token);