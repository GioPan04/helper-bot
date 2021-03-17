import { createConnection } from "typeorm";
import Warn from "./models/Warn";

export async function connect() {
    await createConnection({
        host: process.env.MYSQL_HOST,
        type: "mariadb",
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_NAME,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        synchronize: true,
        entities: [
            Warn,
        ]
    });
}