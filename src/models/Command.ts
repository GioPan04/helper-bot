import {EmbedFieldData, Message} from "discord.js";
require('dotenv').config();

export class BotCommand {

    constructor(
        public name: string,
        public description: string,
        public executor: (msg: Message, args: string[]) => void | Promise<Message | undefined>,
        public args: BotCommandArgument[] = []
    ) {}

    execute(msg: Message) {
        let args = msg.content.split(' ').slice(1);
        let requiredArguments = this.args.filter(a => a.required === true);
        if(args.length < requiredArguments.length) return msg.channel.send(this.generateUsage());
        this.executor(msg, args);
    }

    public generateUsage() {
        let result = `${this.name} usage:\n*parameter is not required\n\`${process.env.CMD_PREFIX}${this.name}`;
        for(let arg in this.args) {
            result += ` ${this.args[arg].required === true ? '' : '*'}[${this.args[arg].name}]`
        }
        result += '`';
        return result;
    }

    public toField(): EmbedFieldData {
        return {name: this.name, value: this.description};
    }

}

export interface BotCommandArgument {
    name: string;
    required?: boolean;
}