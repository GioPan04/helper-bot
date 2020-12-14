import {GuildChannel, Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import userParser from '../utils/userParser';

const vortexCmd = new BotCommand({
    name: 'vortex',
    description: 'Quickly move a user between two random voice channels',
    executor: executor,
    args: [
        {name: 'user', required: true}
    ],
    requireMod: true,
}); 

async function executor(msg: Message, args: string[]) {
    
    // Get all voice channels
    let voiceChannels = msg.guild?.channels.cache.filter(c => c.type == 'voice').array() ?? [];
    
    // Check if voice channels are < 3
    if((voiceChannels?.length ?? 0) < 3) {
        msg.channel.send(`There are only ${voiceChannels?.length} voice channels, you need min 3`);
    }
    
    let user = userParser(args[0], msg.guild);
    if(user === undefined) return msg.channel.send(`The user ${args[0]} can't be found.`);
    
    // Get the original user's voice channel, this is needed because when vortexing the user can't rejoin in the same channel
    // and because when vortex finish the user will rejoin in the original voice channel
    let originalChannelID = user.voice.channelID;
    if(originalChannelID === null) return msg.channel.send(`${user} is not in a voice channel!`);
    
    let vortexingMsg = await msg.channel.send(`Vortexing ${user}`);
    let vortexingChannels: GuildChannel[] = [];
    
    // Remove the original channel from the avaible voice channels
    voiceChannels = voiceChannels.filter(c => c.id != originalChannelID);
    
    // Generate 2 voice channel where the user will be vortexed
    for(let i = 0; i < 2; i++) {
        let possibleIndex;
        do {
            possibleIndex = Math.floor(Math.random() * voiceChannels.length);
        } while(vortexingChannels.includes(voiceChannels[possibleIndex]));
        vortexingChannels.push(voiceChannels[possibleIndex]);
    }
    
    // MAKE THE VORTEX!
    for(let i = 0; i < 9; i++) {
        if(i % 2 === 0) {
            await user.voice.setChannel(vortexingChannels[0]);
        } else {
            await user.voice.setChannel(vortexingChannels[1]);
        }

        // Wait 100ms because Discord developers are funny and after 10 channels changes the server will wait 2 secs 
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Make the user back to the original channel
    await user.voice.setChannel(originalChannelID);
    
    vortexingMsg.edit(`${user} has been vortexed`);
}


export default vortexCmd;