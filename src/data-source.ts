import "reflect-metadata"
import { DataSource } from "typeorm"
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "containers-us-west-38.railway.app",
    port: 6144,
    username: "root",
    password: "mBRWqNVCfnDJVgRf8Vze",
    database: "railway",
    synchronize: false,
    logging: false,
    // entities: ["entity/*.ts"],
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: [__dirname + '/entity/*.{js,ts}'],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})