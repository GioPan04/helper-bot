import Discord from 'discord.js';
import * as commandHandler from './commandHandler';
const app = new Discord.Client();
require('dotenv').config();

if(process.env.DISCORD_TOKEN === undefined || process.env.CMD_PREFIX === undefined)
    console.error('DISCORD_TOKEN or CMD_PREFIX is not set in .env');

app.on('ready', () => console.log(`Logged in as ${app.user?.tag}!`));

app.on('message', (message) => {
    if(message.content.startsWith(process.env.CMD_PREFIX ?? '')) {
        commandHandler.handle(message);
    }
});

app.login(process.env.DISCORD_TOKEN);