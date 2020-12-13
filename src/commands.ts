import { BotCommand } from "./models/Command";
import pingCmd from "./commands/ping";
import helpCmd from "./commands/help";
import vortexCmd from "./commands/vortex";
import kickCmd from "./commands/kick";
import banCmd from "./commands/ban";

const commands: BotCommand[] = [
    pingCmd,
    //helpCmd,
    vortexCmd,
    kickCmd,
    banCmd,
];

export default commands;