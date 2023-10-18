import {GraphQLInputType, GraphQLList, GraphQLObjectType} from "graphql";

import {PageInput, PageOutput} from "./types/Repository";


export default function queryFieldTypeArgs({
    name,
    scalarName,
    type,
    whereType,
    defaultPage
}: {
    name: string;
    scalarName: string;
    type: GraphQLObjectType;
    whereType: GraphQLInputType;
    defaultPage?: {
        limit: number;
        offset: number;
    };
}) {
    return {
        type: new GraphQLObjectType({
            name: name,
            description: `The result of a query on the ${scalarName}s table.`,
            fields: {
                data: {
                    type: new GraphQLList(type),
                    description: `A list of ${scalarName}s which matched the query.`
                },
                page: {
                    type: PageOutput,
                    description:
                        "The pagination information for the current page of the query."
                }
            }
        }),
        args: {
            where: {
                type: whereType,
                description: `Limits the ${scalarName}s returned to a series of constraints among their properties.`
            },
            page: {
                type: PageInput,
                description:
                    "Specifies the pagination information for this query.",
                defaultValue: {
                    limit: defaultPage?.limit ?? 50,
                    offset: defaultPage?.offset ?? 0
                }
            }
        }
    };
}
