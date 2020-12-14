import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import userParser from '../utils/userParser';

const kickCmd = new BotCommand({
    name: 'kick',
    description: 'Kick a user from the server',
    executor: executor,
    args: [
        {name: 'user', required: true},
        {name: 'reason'}
    ],
    requireMod: true,
});

function executor(msg:Message, args: string[]) {
    let user = userParser(args[0], msg.guild);
    if(user === undefined) return msg.channel.send(`Can't find the user!`);
    if(!user?.kickable) return msg.channel.send(`Can't kick ${user}!`);
    
    user.kick(args[1]);
    msg.channel.send(`${user} was kicked for \`${args[1]}\``);
}

export default kickCmd;