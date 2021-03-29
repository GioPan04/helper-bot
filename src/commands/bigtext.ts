import {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import BigTextConverter from "../utils/bigtexter";

const bigTextCmd = new BotCommand({
    name: 'bigtext',
    description: 'Convert a text to a sequece of emojis',
    args: [
        {name: "Text", required: true}
    ],
    executor: executor
});

function executor (msg: Message, args: string[]) {
    try {
        const output = BigTextConverter(args.join(' '));
        msg.channel.send(output);
    } catch (e) {
        msg.channel.send("You send a text that I can't convert to an emoji!");
    }
}

export default bigTextCmd;