import {EmbedFieldData, Message} from "discord.js";
require('dotenv').config();

export class BotCommand {

    constructor(
        public name: string,
        public description: string,
        public executor: (msg: Message, args: string[]) => void | Promise<Message | undefined>,
        public args: string[] = []
    ) {}

    execute(msg: Message) {
        let args = msg.content.split(' ').slice(1);
        if(args.length < this.args.length) return msg.channel.send(this.generateUsage());
        this.executor(msg, args);
    }

    public generateUsage() {
        let result = `${this.name} usage:\n\`${process.env.CMD_PREFIX}${this.name}`;
        for(let arg in this.args) {
            result += ` [${this.args[arg]}]`
        }
        result += '`';
        return result;
    }

    public toField(): EmbedFieldData {
        return {name: this.name, value: this.description};
    }

}

