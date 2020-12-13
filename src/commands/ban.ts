import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import userParser from '../utils/userParser';

const banCmd = new BotCommand('kick', 'Kick a user from the server', executor, ['user', 'reason']);

function executor(msg:Message, args: string[]) {
    let user = userParser(args[0], msg.guild);
    if(user === undefined) return msg.channel.send(`Can't find the user!`);
    if(!user?.bannable) return msg.channel.send(`Can't ban ${user}!`);
    
    user.ban({reason: args[1]});
    msg.channel.send(`${user} was banned for \`${args[1]}\``);
}

export default banCmd;