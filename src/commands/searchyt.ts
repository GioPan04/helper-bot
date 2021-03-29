import Discord, { Message } from 'discord.js';
import { BotCommand } from '../models/Command';
import ytsearch from "../utils/ytsearcher"; 

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

async function executor(msg: Message, args: string[]) {
    const query = args.join(' ');

    const res = await ytsearch(query);

    if(!res) throw new Error("Undefined yt results");

    const fields = res.map<Discord.EmbedFieldData>((video) => {
        return {name: video.title, value: video.link};
    });

    const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setAuthor("YouTube results")
        .setDescription(`Results given by searching ${query}`)
        .addFields(fields);

    msg.channel.send(embed);

}

export default searchyt;