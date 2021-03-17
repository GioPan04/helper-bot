import { Message, MessageAttachment, MessageEmbed, EmbedFieldData } from 'discord.js';
import { BotCommand } from '../models/Command';
import Warn from '../models/Warn';
import userParser from '../utils/userParser';

const warnsCmd = new BotCommand({
    name: 'warns',
    description: 'See warns of a user',
    executor: executor,
    requireMod: true,
    args: [
        {
            name: "user",
            required: true
        }
    ],
});

function parseWarnsToFields(warns: Warn[]): EmbedFieldData[] {
    return warns.map<EmbedFieldData>((warn, i) => {
        return {
            name: `Warn n. ${i+1}`,
            value: (warn.reason || '[no reason]') + ' - by ' + warn.author?.displayName
        }
    });
}

async function executor(msg: Message, args: string[]): Promise<void> {
    const user = userParser(args[0], msg.guild);
    if(!user) {
        msg.channel.send("The user cannot be found!");
        return;
    }

    let warns = await Warn.forUser(user, msg.guild);

    const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`Warns for ${user.displayName}`)
        .setDescription(`${user.displayName} has ${warns.length} ${warns.length == 1 ? 'warn' : 'warns'}`)
        .addFields(parseWarnsToFields(warns));

    msg.channel.send(embed); 
}

export default warnsCmd;