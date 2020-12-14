import { DiscordAPIError, Message, TextChannel } from "discord.js";
import { BotCommand } from "../models/Command";
import channelParser from "../utils/channelParser";

const pinCmd = new BotCommand({
    name: 'pin',
    description: 'Pin a message to the current channel or a specific channel',
    executor: executor,
    args: [
        { name: 'channel' }
    ],
    requireMod: true,
});

async function executor(msg: Message, args: string[]) {
    let replyedMsg;
    try {
        replyedMsg = await msg.channel.messages.fetch(msg.reference?.messageID ?? '');
    } catch (e) {
        if(e instanceof DiscordAPIError && e.code === 404) {
            return msg.channel.send("You are not replying to a messege!");
        }
    }
    if(replyedMsg === undefined) return msg.channel.send("You are not replying to a messege!");
    if(!replyedMsg.pinnable) return msg.channel.send(`${replyedMsg.author}'s message can't be pinned`);
    
    
    let pinningMsg = await msg.channel.send('Pinning message...');
    
    if(args.length === 1) {
        let channelToBePinned = channelParser(args[0], msg.guild) as TextChannel;
        if(channelToBePinned === undefined) return msg.channel.send(`Channel: ${args[0]} can't be found!`);
        replyedMsg = await channelToBePinned.send(`Originally posted by ${replyedMsg.author}:\n${replyedMsg.content}`);

    }

    await replyedMsg.pin();
    pinningMsg.edit(`${replyedMsg.author}'s message is now pinned`);
}

export default pinCmd;