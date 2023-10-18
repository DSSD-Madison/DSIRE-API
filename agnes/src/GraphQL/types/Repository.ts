import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType
} from "graphql";


export const PageInput = new GraphQLInputObjectType({
    name: "PageInput",
    description:
        "Specifies the limit (skip) and offset (take) information for a query.",

    fields: {
        limit: {
            type: GraphQLInt,
            description: "Sets the query limit (take).",
            defaultValue: 50
        },
        offset: {
            type: GraphQLInt,
            description: "Set the query offset (skip).",
            defaultValue: 0
        }
    }
});

export const PageOutput = new GraphQLObjectType({
    name: "PageOutput",
    description: "Pagination status for the resultant query.",

    fields: {
        limit: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The limit (take) value used by the last query."
        },
        offset: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: "The offset (skip) value used by the last query."
        }
    }
});
