import Discord, { Message } from 'discord.js';
import { BotCommand } from '../models/Command';
import * as youtubeSearch from "youtube-search";

const searchyt = new BotCommand({
    name: 'searchyt',
    description: 'Search a music from YouTube',
    executor: executor,
    args: [
        {
            name: "Query",
            required: true,
        }
    ]
});

const opts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 10,
    key: process.env.GOOGLE_API_KEY
};

async function executor(msg: Message, args: string[]) {
    const query = args.join(' ');

    youtubeSearch.default(query, opts, (err, res) => {
        if(err || res == undefined) {
            console.error(err);
            throw err;
        }

        const fields = res.map<Discord.EmbedFieldData>((video) => {
            return {name: video.title, value: video.link};
        });

        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setAuthor("YouTube results")
            .setDescription(`Results given by searching ${query}`)
            .addFields(fields);

        msg.channel.send(embed);
    });

}

export default searchyt;