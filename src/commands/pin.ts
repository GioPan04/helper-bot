import { Message, TextChannel } from "discord.js";
import { BotCommand } from "../models/Command";
import channelParser from "../utils/channelParser";

const pinCmd = new BotCommand({
    name: 'pin',
    description: 'Pin a message to the current channel or a specific channel',
    executor: executor,
    args: [
        { name: 'channel' }
    ]
});

async function executor(msg: Message, args: string[]) {
    let replyedMsg = await msg.channel.messages.fetch(msg.reference?.messageID ?? '');
    if(replyedMsg === undefined) return msg.channel.send("Can't find the replyed message");
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