import { Guild } from "discord.js";
import userIdParser from "./userIdParser";

export default function(user: String, guild: Guild | null) {
    return guild?.members.cache.find((u) => u.id === userIdParser(user));
}