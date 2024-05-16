const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

client.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        message.reply("Pong!");
    }else{
        message.reply("!ping");
    }
});

client.login(
    "MTI0MDU1ODgwOTA2MDA4MTY3NA.Gtsm0m.QgvF8RPUj8oJE3P5RDUwGwIE-UwxbzWsGByG_g"
)
