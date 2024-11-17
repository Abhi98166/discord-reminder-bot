const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const sequelize = require('./models/db')
const scheduleReminders = require('./services/scheduleService')
const setupListeners = require('./routes/listener');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    await sequelize.sync();
    console.log('Database synced');

    scheduleReminders(client);
});

setupListeners(client);

client.login(process.env.TOKEN);