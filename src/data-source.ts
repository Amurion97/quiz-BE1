import "dotenv/config"
import "reflect-metadata"
import {DataSource} from "typeorm"
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

const useSsl = (process.env.MYSQL_SSL || "").toUpperCase() === "REQUIRED";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQLHOST || "localhost",
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
    username: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "123456",
    database: process.env.MYSQLDATABASE || "railway",
    ssl: useSsl ? {rejectUnauthorized: false} : undefined,
    synchronize: true,
    logging: false,
    connectTimeout: 10000,
    // entities: ["entity/*.ts"],
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: [__dirname + '/entity/*.{js,ts}'],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})