const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const url_waifu_api = 'https://api.waifu.im/search';
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});


client.on("messageCreate", async (message) => {
    console.log(message.content);
    if (message.content === "waifu") {
        try {
            // Fai una richiesta POST all'API waifu
            const response = await axios.get(url_waifu_api);
            
            // Ottieni l'URL dell'immagine dalla risposta JSON
            const imageUrl = response.data.images[0].url;
            
            // Invia l'URL dell'immagine come risposta al messaggio
            message.reply(imageUrl);
        } catch (error) {
            // Gestisci gli errori qui
            console.error('Errore nella richiesta:', error);
            message.reply("Si è verificato un errore durante la ricerca della waifu.");
        }
    }
});

client.login("");
