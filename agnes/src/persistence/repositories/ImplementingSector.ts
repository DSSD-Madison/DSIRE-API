import {Expression, ExpressionBuilder, SqlBool} from "kysely";

import type {Repository} from "../Repository";
import type {DB} from "../Kysely/databases/programs_prod/introspection";
import db from "../Kysely/databases/programs_prod";
import paginate from "../Kysely/paginate";
import * as KW from "../Kysely/where";

import type ImplementingSector from "../types/ImplementingSector";


export interface WhereImplementingSector {
    id?: KW.WhereNumber;
    name?: KW.WhereString;
    active?: KW.WhereNumber;
}

export const whereImplementingSectorSatisfied =
    (where?: WhereImplementingSector) =>
    (eb: ExpressionBuilder<DB, "implementing_sector">) => {
        const conditions: Expression<SqlBool>[] = [];

        if (!where) return eb.and([]);

        (["id", "name", "active"] as const).forEach(column => {
            if (where[column])
                conditions.push(
                    KW.whereSatisfied<DB, "implementing_sector">(
                        `implementing_sector.${column}`,
                        where[column]
                    )(eb)
                );
        });

        return eb.and(conditions);
    };

const ImplementingSector: Repository<
    ImplementingSector,
    WhereImplementingSector
> = {
    get: (page, where) => {
        let query = db
            .selectFrom("implementing_sector")
            .select([
                "implementing_sector.id",
                "implementing_sector.name",
                "implementing_sector.active"
            ])
            .where(whereImplementingSectorSatisfied(where));

        query = paginate(query, page);

        return query.execute();
    }
};
export default ImplementingSector;
