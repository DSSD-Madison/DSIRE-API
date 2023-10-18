import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

import {WhereNumber, WhereString} from "../Kysely/where";


export const WhereImplementingSector = new GraphQLInputObjectType({
    name: "WhereImplementingSector",
    description: "Where Implementing Sector",

    fields: {
        id: {
            type: WhereNumber,
            description: "TODO"
        },
        name: {
            type: WhereString,
            description: "TODO"
        },
        active: {
            type: WhereNumber,
            description: "TODO"
        }
    }
});

export const ImplementingSector = new GraphQLObjectType({
    name: "ImplementingSector",
    description: "Implementing Sector",

    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "TODO"
        },
        name: {
            type: GraphQLString,
            description: "TODO"
        },
        active: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "TODO"
        }
    }
});
