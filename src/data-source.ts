import "reflect-metadata"
import {DataSource} from "typeorm"
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQLDATABASE || "localhost",
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
    username: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "123456",
    database: process.env.MYSQLDATABASE || "quiz5",
    synchronize: false,
    logging: false,
    // entities: ["entity/*.ts"],
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: [__dirname + '/entity/*.{js,ts}'],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})