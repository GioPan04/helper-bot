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

    if(msgToClear > 100) {
        msg.channel.send("You can't delete more than 100 messages!");
        return;
    }
    
    await (msg.channel as TextChannel).bulkDelete(msgToClear, true);
}

export default clearCmd;