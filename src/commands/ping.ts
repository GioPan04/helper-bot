import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

const cmd = new BotCommand('ping', 'Ping the bot', executor);

function executor (msg: Message) {
    msg.channel.send('Pong!');
}

export default cmd;