import { BotCommand } from "./models/Command";
import pingCmd from "./commands/ping";
import helpCmd from "./commands/help";
import vortexCmd from "./commands/vortex";

const commands: BotCommand[] = [
    pingCmd,
    helpCmd,
    vortexCmd
];

export default commands;