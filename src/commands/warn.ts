import { Message, MessageAttachment } from 'discord.js';
import { BotCommand } from '../models/Command';
import Warn from '../models/Warn';
import userParser from '../utils/userParser';

const warnCmd = new BotCommand({
    name: 'warn',
    description: 'Add a warn to user',
    executor: executor,
    requireMod: true,
    args: [
        {
            name: "user",
            required: true
        },
        {
            name: "reason",
            required: false
        },
    ],
});

async function executor(msg: Message, args: string[]): Promise<void> {
    const user = userParser(args[0], msg.guild);
    if(!user) {
        msg.channel.send("The user cannot be found!");
        return;
    }

    const reason = args.slice(1).join(' ');

    let warn = new Warn;

    warn.authorId = msg.author.id;
    warn.userId = user.id;
    warn.reason = reason;
    await warn.save()

    msg.channel.send(user.toString() + " has been warned for `" + (reason || '[no reason]') + "`");
}

export default warnCmd;