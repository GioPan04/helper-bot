import {Message} from 'discord.js';

export default function (msg: Message) {
    msg.channel.send("Here's a list of all commands avaible:");
}