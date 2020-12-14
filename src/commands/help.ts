import Discord, {Message} from 'discord.js';
import { BotCommand } from '../models/Command';
import commands from '../commands';
require('dotenv').config();

let getHelpEmbed = (): Discord.MessageEmbed => {
    const commandsField = commands.map(cmd => cmd.toField());

    const helpEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setAuthor("Helper Bot's commands")
        .setDescription(`Use ${process.env.CMD_PREFIX}help <command name> to see how to use a specific command`)
        .addFields(commandsField);

    getHelpEmbed = () => helpEmbed;

    return getHelpEmbed();    
};

const helpCmd = new BotCommand({
    name: 'help',
    description: 'Shows this message',
    executor: executor,
    args: [
        { name: 'command' }
    ]
});

function executor(msg: Message, args: string[]) {
    
    if(args.length === 1) {
        let cmd = commands.find(c => c.name === args[0])
        if(cmd === undefined) return msg.channel.send(`The ${args[1]} command doesn't exists! Use ${process.env.CMD_PREFIX}help to get a list of all avaible commands`);
        return msg.channel.send(cmd.generateUsage());
    }
    
    msg.channel.send("Here's a list of all commands avaible:");
    msg.channel.send(getHelpEmbed());
}

export default helpCmd;