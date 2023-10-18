import {type Page} from "../Repository"
import {type SelectQueryBuilder} from "kysely"


export default function paginate<DB, TB extends keyof DB, O>(
    query: SelectQueryBuilder<DB, TB, O>,
    page?: Page
) {
    if (page?.limit) query = query.limit(page.limit);
    if (page?.offset) query = query.offset(page.offset);
    return query;
}
