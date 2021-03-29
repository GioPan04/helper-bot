import { Message, TextChannel } from "discord.js";
import { BotCommand } from "../models/Command";

const clearCmd = new BotCommand({
    name: 'clear',
    description: 'Clear x messages from a thread',
    executor: executor,
    args: [
        {name: 'messages', required: true},
    ],
    requireMod: true,
});

async function executor(msg:Message, args: string[]) {
    const msgToClear = parseInt(args[0]);
    
    (msg.channel as TextChannel).bulkDelete(msgToClear, true);
}

export default clearCmd;