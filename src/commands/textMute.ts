import { Message } from "discord.js";
import { BotCommand } from "../models/Command";
import userParser from "../utils/userParser";

const textMuteCmd = new BotCommand({
    name: 'textmute',
    description: 'Force a user to be muted in a text channel',
    executor: executor,
    args: [
        {name: 'user', required: true}
    ],
    requireMod: true
});

async function executor(msg: Message, args: string[]) {
    let user = userParser(args[0], msg.guild);
    if(!user) return msg.channel.send(`The user can't be found!`);

    const mutedRole = msg.guild?.roles?.cache.find((role) => role.name == 'muted');
    if(!mutedRole) return;
    console.log(mutedRole.members);
    if(user.roles.cache.some((role) => role.id == mutedRole.id)) {
        await user.roles.remove(mutedRole.id);
        msg.channel.send(`${user} has been unmuted!`);
    } else {
        await user.roles.remove(mutedRole.id);
        msg.channel.send(`${user} has been muted!`);
    }

}

export default textMuteCmd;