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
import spamCmd from "./commands/spam";
import playCmd from "./commands/play";
import searchyt from "./commands/searchyt";
import clearCmd from "./commands/clear";
import bigTextCmd from "./commands/bigtext";

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
    spamCmd,
    playCmd,
    searchyt,
    clearCmd,
    bigTextCmd,
];

export default commands;