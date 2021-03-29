import { Message } from 'discord.js';
import { BotCommand } from '../models/Command';
import ytdl, {validateURL} from "ytdl-core";
import search from '../utils/ytsearcher';

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

    let url = args[0];

    if(!validateURL(url)) {
        const searchingVideoMsg = await msg.channel.send('Searching YouTube video...');
        const videos = await search(args.join(' '));

        if(!videos) {
            searchingVideoMsg.edit('No videos found!');
            return;
        }

        searchingVideoMsg.edit(`Found \`${videos[0].title}\``);
        url = videos[0].link;
    } 

    const voice = await msg.member.voice.channel.join();
    const stream = voice.play(ytdl(url, {filter: 'audioonly'}))
    stream.on('finish', () => voice.disconnect());
    
    msg.channel.send("Playing on voice channel");
}

export default playCmd;