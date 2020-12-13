import Discord, {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import commands from '../commands';
require('dotenv').config();

const commandsField = commands.map(cmd => cmd.toField());

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor("Helper Bot's commands")
    .setDescription(`Use ${process.env.CMD_PREFIX} as prefix`)
    .addFields(commandsField);
    

const helpCmd = new BotCommand('help', 'Shows this message', executor); 

function executor(msg: Message) {
    msg.channel.send("Here's a list of all commands avaible:");
    msg.channel.send(helpEmbed);
}

export default helpCmd;