import { Message } from 'discord.js';
import commands from './commands';

require('dotenv').config();

function handle(msg: Message) {
    let cmd = msg.content.substring(1).split(' ')[0].toLowerCase();
    if(!cmd) return;

    let command = commands.find((c) => c.name === cmd);

    if(!command) return msg.channel.send(`Sorry ${msg.author.toString()}, that command does not exist!\nUse ${process.env.CMD_PREFIX}help to get a list of all commands`);

    try {
        command.execute(msg);
    } catch (e) {
        msg.channel.send("Uh oh!\nThe commands exited with an error and I can't give you a response. Please open a issue at the official repo(https://github.com/GioPan04/helper-bot/issues/new)");
    }
}

export { handle };