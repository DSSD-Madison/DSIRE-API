import {Expression, ExpressionBuilder, SqlBool} from "kysely";

import type {Repository} from "../Repository";
import type {DB} from "../Kysely/databases/programs_prod/introspection";
import db from "../Kysely/databases/programs_prod";
import paginate from "../Kysely/paginate";
import * as KW from "../Kysely/where";

import {
    type WhereImplementingSector,
    whereImplementingSectorSatisfied
} from "./ImplementingSector";
import type Program from "../types/Program";


export interface WhereProgram {
    id: KW.WhereNumber;
    is_entire_state: KW.WhereNumber;
    name: KW.WhereString;
    start_date: KW.WhereDate;
    end_date: KW.WhereDate;
    summary: KW.WhereString;

    implementing_sector: WhereImplementingSector;
}

export const whereProgramSatisfied =
    (where?: WhereProgram) =>
    (eb: ExpressionBuilder<DB, "program" | "implementing_sector">) => {
        const conditions: Expression<SqlBool>[] = [];

        if (!where) return eb.and([]);

        (
            [
                "id",
                "is_entire_state",
                "name",
                "start_date",
                "end_date",
                "summary"
            ] as const
        ).forEach(column => {
            if (where[column])
                conditions.push(
                    KW.whereSatisfied<DB, "program">(
                        `program.${column}`,
                        where[column]
                    )(eb)
                );
        });

        return eb.and([
            whereImplementingSectorSatisfied(where?.implementing_sector)(eb),
            ...conditions
        ]);
    };

const Program: Repository<Program, WhereProgram> = {
    get: async (page, where) => {
        let query = db
            .selectFrom("program")
            .innerJoin(
                "implementing_sector",
                "implementing_sector.id",
                "implementing_sector_id"
            )
            .select([
                "program.id",
                "program.is_entire_state",
                "program.name",
                "program.start_date",
                "program.end_date",
                "program.summary",

                "implementing_sector.id as implementing_sector_id",
                "implementing_sector.name as implementing_sector_name",
                "implementing_sector.active as implementing_sector_active"

                // // M2M utilities
                // "program_utility.program_id",
                // // M2M technology
                // "program_technology.program_id",
                // // M2M sectors
                // "program_sector.program_id",
                // // M2M program_detail
                // "program_detail.program_id",
                // "program.summary"
            ])
            .where(whereProgramSatisfied(where));

        query = paginate(query, page);

        const programs = await query.execute();

        return programs.map(program => ({
            id: program.id,
            is_entire_state: program.is_entire_state,
            name: program.name,
            start_date: program.start_date,
            end_date: program.end_date,
            summary: program.summary,
            implementing_sector: {
                id: program.implementing_sector_id,
                name: program.implementing_sector_name,
                active: program.implementing_sector_active
            }
        }));
    }
};
export default Program;
