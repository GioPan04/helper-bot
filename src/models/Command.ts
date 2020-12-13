import {Message} from "discord.js";

export class BotCommand {

    constructor(
        public name: string,
        public description: string,
        public usage: string,
        public executor: Function,
        public minArgs: number
    ) {}

    execute(msg: Message) {
        let args = msg.content.split(' ').slice(1);
        if(args.length < this.minArgs) return msg.channel.send(this.usage.toString());
        this.executor();
    }
    
}

