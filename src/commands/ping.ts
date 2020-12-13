import {Message} from 'discord.js';

export default function (msg: Message) {
    msg.channel.send('Pong!');
}