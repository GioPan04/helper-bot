import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

let kickCmd = new BotCommand('kick', 'Kick a user from the server', executor, ['user']);

function executor(msg:Message) {
    
}

export default kickCmd;