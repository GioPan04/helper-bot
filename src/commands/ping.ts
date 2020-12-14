import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

const pingCmd = new BotCommand({
    name: 'ping',
    description: 'Ping the bot',
    executor: executor
});

function executor (msg: Message) {
    msg.channel.send('Pong!');
}

export default pingCmd;