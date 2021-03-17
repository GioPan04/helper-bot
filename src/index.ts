import Discord from 'discord.js';
import * as commandHandler from './commandHandler';
import * as Database from "./Database";
const app = new Discord.Client();
require('dotenv').config();

if(process.env.DISCORD_TOKEN === undefined || process.env.DISCORD_TOKEN === '' || process.env.CMD_PREFIX === undefined)
    console.error('DISCORD_TOKEN or CMD_PREFIX is not set in .env');

app.on('ready', () => console.log(`Logged in as ${app.user?.tag}!`));

app.on('message', (message) => {
    if(message.content.startsWith(process.env.CMD_PREFIX ?? '') && !message.author.bot) {
        commandHandler.handle(message);
    }
});

Database.connect();

app.login(process.env.DISCORD_TOKEN);