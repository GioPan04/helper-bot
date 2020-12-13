import Discord, {Message} from 'discord.js';
require('dotenv').config();

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor("Helper Bot's commands")
    .setDescription(`Use ${process.env.CMD_PREFIX} as prefix`)
    .addFields(
        { name: 'ping', value: 'Ping the bot' },
        { name: 'help', value: 'Shows this message' },
        { name: 'vortex', value: 'Move a user between multiple voice channels' },
    );

export default function (msg: Message) {
    msg.channel.send("Here's a list of all commands avaible:");
    msg.channel.send(helpEmbed);
}