import { Message } from 'discord.js';
import ping from './commands/ping';
import help from './commands/help';
import vortex from './commands/vortex';
import kick from "./commands/kick";

function handle(msg: Message) {
    let cmd = msg.content.substring(1).split(' ')[0];
    switch (cmd) {
        case 'ping':
            ping(msg);
            break;
        case 'help':
            help(msg);
            break;
        case 'vortex':
            vortex(msg);
            break;
        case 'kick':
            kick.execute(msg);
            break;
        default:
            msg.channel.send(`Sorry ${msg.author.toString()}, that command does not exist!`);
            break;
    }
}

export { handle };