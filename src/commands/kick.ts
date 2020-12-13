import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

let cmd = new BotCommand('kick', 'Kick a user from the server', '$kick @User', executor, 1);

function executor(msg:Message) {
    
}

export default cmd;