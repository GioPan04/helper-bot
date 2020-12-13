import { Guild } from "discord.js";
import channelIdParser from "./channelIdParser";

export default function(channel: String, guild: Guild | null) {
    return guild?.channels.cache.find((c) => c.id === channelIdParser(channel));
}