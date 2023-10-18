import {
    Expression,
    ExpressionBuilder,
    ReferenceExpression,
    SqlBool
} from "kysely";


interface WhereBase<T> {
    equals?: T;
    not?: T;
    in?: T[];
    notIn?: T[];
}
interface WhereOrderable<T> extends WhereBase<T> {
    lt?: T;
    lte?: T;
    gt?: T;
    gte?: T;
}

export interface WhereBoolean extends WhereBase<boolean> {}
export interface WhereNumber extends WhereOrderable<number> {}
export interface WhereString extends WhereOrderable<string> {
    contains?: string;
    startsWith?: string;
    endsWith?: string;
}
export interface WhereDate extends WhereOrderable<Date> {}

export const whereSatisfied = <DB, TB extends keyof DB>(
    column: ReferenceExpression<DB, TB>,
    where: WhereBoolean | WhereNumber | WhereString | WhereDate | null | undefined
) => (eb: ExpressionBuilder<DB, TB>) => {
    const conditions: Expression<SqlBool>[] = [];

    // and([]) evaluates to true
    if (!where) return eb.and([])

    // WhereBase
    if (where.equals) conditions.push(eb(column, "=", where.equals));
    if (where.not) conditions.push(eb(column, "!=", where.not));
    if (where.in) conditions.push(eb(column, "in", where.in));
    if (where.notIn) conditions.push(eb(column, "not in", where.notIn));

    // WhereOrderable
    // TODO To type guard
    if ("lt" in where || "lte" in where || "gt" in where || "gte" in where) {
        if (where.lt) conditions.push(eb(column, "<", where.lt));
        if (where.lte) conditions.push(eb(column, "<=", where.lte));
        if (where.gt) conditions.push(eb(column, ">", where.gt));
        if (where.gte) conditions.push(eb(column, ">=", where.gte));
    }

    // WhereString
    // TODO To type guard
    if ("contains" in where || "startsWith" in where || "endsWith" in where) {
        if (where.contains)
            conditions.push(eb(column, "like", `%${where.contains}%`));
        if (where.startsWith)
            conditions.push(eb(column, "like", `${where.startsWith}%`));
        if (where.endsWith)
            conditions.push(eb(column, "like", `%${where.endsWith}`));
    }

    return eb.and(conditions);
}
