import {EmbedFieldData, Message} from "discord.js";
require('dotenv').config();

export interface IBotCommand {
    name: string,
    description: string,
    executor: (msg: Message, args: string[]) => void | any;
    requireMod?: boolean;
    args?: BotCommandArgument[];
}

export class BotCommand implements IBotCommand {

    name: string;
    description: string;
    executor: (msg: Message, args: string[]) => void | Promise<void> | any;
    requireMod: boolean = false;
    args: BotCommandArgument[] = [];

    constructor({name, description, executor, requireMod, args}: IBotCommand) {
        this.name = name;
        this.description = description,
        this.executor = executor,
        this.requireMod = requireMod ?? false,
        this.args = args ?? [];
    }

    public async execute(msg: Message) : Promise<void> {
        if(this.requireMod && msg.member?.roles.cache.find(r => r.name === process.env.MOD_ROLE_NAME ?? '') === undefined) {
            msg.channel.send(`Sorry, ${msg.author} you don't have permission to do that.`);
            return;
        }
        let args = msg.content.split(' ').slice(1);
        let requiredArguments = this.args.filter(a => a.required === true);
        if(args.length < requiredArguments.length) {
            msg.channel.send(this.generateUsage());
            return;
        }
        await this.executor(msg, args);
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
        let name: string;
        if(this.requireMod) {
            name = `${this.name} [MOD]`
        } else {
            name = this.name;
        }
        return {name: name, value: this.description};
    }

}

export interface BotCommandArgument {
    name: string;
    required?: boolean;
}