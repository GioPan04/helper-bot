import {GuildChannel, Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import userIdParser from "../utils/userIdParser";

const vortexCmd = new BotCommand('vortex', 'Quickly move a user between two random voice channels', executor); 

async function executor(msg: Message) {
    
    let args = msg.content.split(' ').slice(1);
    
    
    let voiceChannels = msg.guild?.channels.cache.filter(c => c.type == 'voice').array() ?? [];
    
    if((voiceChannels?.length ?? 0) < 3) {
        msg.channel.send(`There are only ${voiceChannels?.length} voice channels, you need min 3`);
    }
    
    
    if(args[0] === undefined || args[0] === '') return msg.channel.send('Vortex command requires a user!');
    
    let user = msg.guild?.members.cache.filter((u) => u.id === userIdParser(args[0])).first();
    
    if(user === undefined) return msg.channel.send(`The user ${args[0]} can't be found.`);
    
    let originalChannelID = user.voice.channelID;
    if(originalChannelID === null) return msg.channel.send(`${user} is not in a voice channel!`);
    
    let vortexingMsg = await msg.channel.send(`Vortexing ${user}`);
    let vortexingChannels: GuildChannel[] = [];
    
    voiceChannels = voiceChannels.filter(c => c.id != originalChannelID);
    
    for(let i = 0; i < 2; i++) {
        let possibleIndex;
        do {
            possibleIndex = Math.floor(Math.random() * voiceChannels.length);
        } while(vortexingChannels.includes(voiceChannels[possibleIndex]));
        vortexingChannels.push(voiceChannels[possibleIndex]);
    }
    
    for(let i = 0; i < 9; i++) {
        if(i % 2 === 0) {
            await user.voice.setChannel(vortexingChannels[0]);
        } else {
            await user.voice.setChannel(vortexingChannels[1]);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await user.voice.setChannel(originalChannelID);
    
    vortexingMsg.edit(`${user} has been vortexed`);
}


export default vortexCmd;