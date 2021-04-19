import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

const stopCmd = new BotCommand({
    name: 'stop',
    description: 'Disconnect the bot from the voice channel',
    executor: executor
});

function executor (msg: Message) {
    msg.guild?.me?.voice.channel?.leave();
    msg.channel.send('Bye!');
}

export default stopCmd;