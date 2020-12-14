import { Message } from "discord.js";
import { BotCommand } from "../models/Command";
import userParser from "../utils/userParser";

const muteCmd = new BotCommand('mute', 'Force a user to be muted in a voice channel', executor, [{name: 'user', required: true}]);

async function executor(msg: Message, args: string[]) {
    let user = userParser(args[0], msg.guild);
    if(user === undefined) return msg.channel.send(`The user can't be found!`);
    
    if(user.voice.mute) {
        await user.voice.setMute(false);
        msg.channel.send(`${user} has been unmuted!`);
    } else {
        await user.voice.setMute(true);
        msg.channel.send(`${user} has been muted!`);
    }

}

export default muteCmd;