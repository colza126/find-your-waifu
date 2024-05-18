const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
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

// Comandi da registrare con parametri
const commands = [
    new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Trova una waifu casuale')
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Il tag per filtrare le waifu')
                .setRequired(false)
        )
        .toJSON(),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra informazioni sui comandi disponibili')
        .toJSON()
];

// Inizializza REST per registrare i comandi
const rest = new REST({ version: '10' }).setToken(token);

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
        const tag = interaction.options.getString('tag'); // Ottieni il valore del parametro 'tag'
        const url = tag ? `https://api.waifu.im/search?included_tags=${tag}` : 'https://api.waifu.im/search';
        try {
            const response = await axios.get(url);
            const imageUrl = response.data.images[0].url;
            await interaction.reply(imageUrl);
        } catch (error) {
            console.error('Errore nella richiesta:', error);
            await interaction.reply('Si è verificato un errore durante la ricerca della waifu.');
        }
    } else if (commandName === 'help') {
        const helpMessage = `
**Comandi Disponibili:**
/waifu [tag]: Trova una waifu casuale. Puoi specificare un tag opzionale per filtrare le waifu.
Tags disponibili:
Versatile:
- maid: Cute womans or girl employed to do domestic work in their working uniform.
- waifu: A female anime/manga character.
- marin-kitagawa: One of two main protagonists (alongside Wakana Gojo) in the anime and manga series My Dress-Up Darling.
- mori-calliope: Mori Calliope is an English Virtual YouTuber (VTuber) associated with hololive as part of its first-generation English branch of Vtubers.
- raiden-shogun: Genshin Impact's Raiden Shogun is a fierce lady in the Genshin ranks.
- oppai: Girls with large breasts.
- selfies: A photo-like image of a waifu.
- uniform: Girls wearing any kind of uniform, cosplay etc.
- kamisato-ayaka: Kamisato Ayaka is a playable Cryo character in Genshin Impact.

NSFW (non sicuri per il lavoro):
- ass: Girls with a large butt.
- hentai: Explicit sexual content.
- milf: A sexually attractive middle-aged woman.
- oral: Oral sex content.
- paizuri: A subcategory of hentai that involves breast sex, also known as titty fucking.
- ecchi: Slightly explicit sexual content. Shows full to partial nudity. Doesn't show any genital.
- ero: Any kind of erotic content, basically any nsfw image.
        `;
        console.log('Help command executed'); // Aggiungi un log per il comando help
        await interaction.reply(helpMessage);
    }
});

// Login del bot su Discord
client.login(token);