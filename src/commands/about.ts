import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';

const aboutCmd = new BotCommand({
    name: 'about',
    description: 'Get info about the bot',
    executor: executor
});

function executor (msg: Message) {
    msg.channel.send('Hi!\nThis bot was made by Gioele Pannetto.\nYou can find the source code at https://github.com/GioPan04/helper-bot');
}

export default aboutCmd;