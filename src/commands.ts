import { BotCommand } from "./models/Command";

// Import all commands
import pingCmd from "./commands/ping";
import helpCmd from "./commands/help";
import vortexCmd from "./commands/vortex";
import kickCmd from "./commands/kick";
import banCmd from "./commands/ban";
import pinCmd from "./commands/pin";

const commands: BotCommand[] = [
    pingCmd,
    helpCmd,
    vortexCmd,
    kickCmd,
    banCmd,
    pinCmd,
];

export default commands;