import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

import GraphQLDate from "../../types/GraphQL/Date";
import {
    ImplementingSector,
    WhereImplementingSector
} from "./ImplementingSector";
import {WhereDate, WhereNumber, WhereString} from "../Kysely/where";


export const WhereProgram = new GraphQLInputObjectType({
    name: "WhereProgram",
    description: "Where Program",

    fields: {
        id: {
            type: WhereNumber,
            description: "hi"
        },
        is_entire_state: {
            type: WhereNumber,
            description: "hi"
        },
        name: {
            type: WhereString,
            description: "hi"
        },
        start_date: {
            type: WhereDate,
            description: "hi"
        },
        end_date: {
            type: WhereDate,
            description: "hi"
        },
        summary: {
            type: WhereString,
            description: "hi"
        },
        implementing_sector: {
            type: WhereImplementingSector,
            description: "hi"
        }
    }
});

export const Program = new GraphQLObjectType({
    name: "Program",
    description: "A sustainability incentive catalogued by EnergySage.",

    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "hi"
        },
        is_entire_state: {
            type: new GraphQLNonNull(GraphQLDate),
            description: "hi"
        },
        name: {
            type: GraphQLString,
            description: "The official title of the program"
        },
        start_date: {
            type: GraphQLDate,
            description: "Program start date"
        },
        end_date: {
            type: GraphQLDate,
            description: "Program end date"
        },
        summary: {
            type: GraphQLString,
            description: "Summary of the program",

            args: {
                first: {
                    type: GraphQLInt,
                    description: "hi"
                }
            },
            resolve: (object, args, context, info) => `${object.summary.substring(0, args.first)}...`
        },
        implementing_sector: {
            type: ImplementingSector,
            description: "hi"
        }
    }
});
