import { BotCommand } from "./models/Command";

// Import all commands
import pingCmd from "./commands/ping";
import helpCmd from "./commands/help";
import vortexCmd from "./commands/vortex";
import kickCmd from "./commands/kick";
import banCmd from "./commands/ban";
import pinCmd from "./commands/pin";
import muteCmd from "./commands/forceMute";
import aboutCmd from "./commands/about";
import textMuteCmd from "./commands/textMute";
import warnCmd from "./commands/warn";
import warnsCmd from "./commands/warns";

const commands: BotCommand[] = [
    pingCmd,
    helpCmd,
    aboutCmd,
    vortexCmd,
    kickCmd,
    banCmd,
    pinCmd,
    muteCmd,
    textMuteCmd,
    warnCmd,
    warnsCmd,
];

export default commands;