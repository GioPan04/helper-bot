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
        if(e instanceof Error) {
            msg.channel.send(e.message);
        } else {
            throw e;
        }
    }
}

export default bigTextCmd;