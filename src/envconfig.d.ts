declare namespace NodeJS {
    export interface ProcessEnv {
        // Database config
        MYSQL_HOST: string;
        MYSQL_PORT: number;
        MYSQL_USER: string;
        MYSQL_PASSWORD?: string;
        MYSQL_NAME: string;

        CMD_PREFIX: string;
        DISCORD_TOKEN: string;
        MOD_ROLE_NAME: string;
    }
}