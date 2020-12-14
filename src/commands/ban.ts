import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import userParser from '../utils/userParser';

const banCmd = new BotCommand({
    name: 'ban',
    description: 'Ban a user from the server',
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
    if(!user?.bannable) return msg.channel.send(`Can't ban ${user}!`);
    
    user.ban({reason: args[1]});
    msg.channel.send(`${user} was banned for \`${args[1]}\``);
}

export default banCmd;