import {Message} from 'discord.js';

export default function (msg: Message) {
    let user = msg.content.split(' ')[1];
    if(user === undefined || user === '') return msg.channel.send('Vortex command requires a user!');
    //msg.channel.send(user);
}