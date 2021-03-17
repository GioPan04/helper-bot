import { Message } from 'discord.js';
import { BotCommand } from '../models/Command';
import sleep from '../utils/sleep';

const spamCmd = new BotCommand({
    name: 'spam',
    description: 'Send a message multiple times',
    executor: executor,
    args: [
        {
            name: "times",
            required: true
        },
        {
            name: "message",
            required: true
        },
    ]
});

async function executor (msg: Message, args: string[]) {
    const message = args.slice(1).join(' ');
    if(message.charAt(0) == process.env.CMD_PREFIX) return msg.channel.send("You can't spam a bot command!");
    for(let i = 0; i < parseInt(args[0]); i++) {
        msg.channel.send(message);
        await sleep(100);
    }
}

export default spamCmd;