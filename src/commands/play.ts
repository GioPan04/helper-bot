import { Message } from 'discord.js';
import { BotCommand } from '../models/Command';
import ytdl from "ytdl-core";

const playCmd = new BotCommand({
    name: 'play',
    description: 'Play a music from YouTube',
    executor: executor,
    args: [
        {
            name: "Url",
            required: true,
        }
    ]
});

async function executor(msg: Message, args: string[]) {
    if(msg.member?.voice.channel == null) {
        msg.channel.send("You are not connected to any voice channel!");
        return;
    }

    const voice = await msg.member.voice.channel.join();
    const stream = voice.play(ytdl(args[0], {filter: 'audioonly'}))
    stream.on('finish', () => voice.disconnect());
    
    msg.channel.send("Playing on voice channel");
}

export default playCmd;