import {Kysely, MysqlDialect} from "kysely";
import {createPool} from "mysql2";

import {DB} from "./programs_prod/introspection";


export default new Kysely<DB>({
    dialect: new MysqlDialect({
        // HACK Ensure set in environment before starting
        pool: createPool({
            database: process.env.DB_DATABASE!,
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            port: 3306,
            connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT!)
        })
    })
});
