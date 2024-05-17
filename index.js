const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const axios = require('axios');

// Token del bot e ID dell'applicazione
const token = '';
const clientId = '';

// Inizializza il client Discord
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Comandi da registrare
const commands = [
    {
        name: 'waifu',
        description: 'Trova una waifu casuale'
    }
];

// Inizializza REST per registrare i comandi
const rest = new REST({ version: '9' }).setToken(token);

// Funzione asincrona per registrare i comandi globali
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId), // Per comandi globali
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Evento quando il bot è pronto
client.once('ready', () => {
    console.log('Bot is ready!');
});

// Gestisce le interazioni con i comandi slash
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'waifu') {
        try {
            const response = await axios.get('https://api.waifu.im/search');
            const imageUrl = response.data.images[0].url;
            await interaction.reply(imageUrl);
        } catch (error) {
            console.error('Errore nella richiesta:', error);
            await interaction.reply('Si è verificato un errore durante la ricerca della waifu.');
        }
    }
});

// Login del bot su Discord
client.login(token);
