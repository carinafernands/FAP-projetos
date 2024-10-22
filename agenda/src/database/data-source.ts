//importação do Reflect Metadata

import "reflect-metadata";

//importação do datasource
import { DataSource } from "typeorm";

//criação de um objeto
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "agenda",
    synchronize: true,
    logging: false,
    entities: [],
})
