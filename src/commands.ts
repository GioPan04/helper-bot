import { BotCommand } from "./models/Command";
import pingCmd from "./commands/ping";
import helpCmd from "./commands/help";
import vortexCmd from "./commands/vortex";
import kickCmd from "./commands/kick";

const commands: BotCommand[] = [
    pingCmd,
    //helpCmd,
    vortexCmd,
    kickCmd
];

export default commands;