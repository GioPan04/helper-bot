import { Guild, GuildMember } from "discord.js";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('warns')
export default class Warn extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({type: "text", nullable: false, default: ""})
    public reason!: string;

    @Column({type: "varchar", nullable: false})
    public userId!: string;

    @Column({type: "varchar", nullable: false})
    public authorId!: string;

    public author?: GuildMember;

    static async forUser(user: GuildMember, guild?: Guild | null): Promise<Warn[]> {
        const warns = await this.find({
            where: {
                userId: user.id,
            }
        });

        if(guild) warns.forEach((warn) => {
            warn.loadAuthor(guild);
        });
        
        return warns;
    }

    public loadAuthor(guild: Guild) {
        this.author = guild.members.cache.find((member) => member.id == this.authorId);
    }

    public toMessage(): string {
        return `Author: ${this.author?.displayName ?? '[not found]'}. Reason: ${'`' + (this.reason || '[empty]') + '`'}\n`;
    }
}