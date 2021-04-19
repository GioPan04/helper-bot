import { Message, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import { BotCommand } from '../models/Command';
import ytdl, {validateURL} from "ytdl-core";
import search from '../utils/ytsearcher';


const playCmd = new BotCommand({
    name: 'play',
    description: 'Play a video from YouTube',
    executor: executor,
    args: [
        {
            name: "Url or title",
            required: true,
        }
    ]
});

// Urls in queue
let queue: string[] = [];

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

    queue.push(url);

    if(queue.length == 1) {
        const voice = await msg.member.voice.channel.join();
        play(voice, msg.channel as TextChannel);
    } else {
        await msg.channel.send('Video added to the queue');
    }
    
}

async function play(voice: VoiceConnection, textCh: TextChannel) {
    if(queue.length == 0) return;

    const url = queue[0];
    await textCh.send(`Now playing ${url}`);
    
    const stream = voice.play(ytdl(url, {filter: 'audioonly'}));

    
    stream.on('finish', () => {
        if(queue.length <= 1) {
            voice.disconnect();
        } else {
            queue.shift();
            play(voice, textCh);
        }
    });
}

export default playCmd;