import {Message} from "discord.js";

export class BotCommand {
    name: String;
    description: String;
    usage: String;
    executor: Function;
    minArgs: Number;
    
    constructor(name: String, description: String, usage: String, executor: Function, minArgs: Number) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.executor = executor;
        this.minArgs = minArgs ?? 0;
    }

    execute(msg: Message) {
        let args = msg.content.split(' ').slice(1);
        if(args.length < this.minArgs) return msg.channel.send(this.usage.toString());
        this.executor();
    }
}

