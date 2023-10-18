import {
    GraphQLBoolean,
    GraphQLInputFieldConfig,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    ThunkObjMap
} from "graphql";

import GraphQLDate from "../../types/GraphQL/Date";


const whereBaseFactory = (
    type:
        | typeof GraphQLBoolean
        | typeof GraphQLInt
        | typeof GraphQLString
        | typeof GraphQLDate
): ThunkObjMap<GraphQLInputFieldConfig> => ({
    equals: {
        type,
        description: "The property equals only this value."
    },
    not: {
        type,
        description: "The property does not equal this value."
    },
    in: {
        type: new GraphQLList(type),
        description: "The property equals any of these values."
    },
    notIn: {
        type: new GraphQLList(type),
        description: "The property does not equal any of these values."
    }
});
const whereOrderableFactory = (
    type: typeof GraphQLInt | typeof GraphQLString | typeof GraphQLDate
): ThunkObjMap<GraphQLInputFieldConfig> => ({
    lt: {
        type,
        description: "The property is strictly less than this value."
    },
    lte: {
        type,
        description: "The property is less than or equal to this value."
    },
    gt: {
        type,
        description: "The property is strictly greater than this value."
    },
    gte: {
        type,
        description: "The property is greater than or equal to this value."
    }
});

export const WhereBoolean = new GraphQLInputObjectType({
    name: "WhereBoolean",
    description:
        "Restricts a boolean property to a combined series of conditions.",

    fields: {...whereBaseFactory(GraphQLBoolean)}
});
export const WhereNumber = new GraphQLInputObjectType({
    name: "WhereNumber",
    description:
        "Restricts a numeric property to a combined series of conditions.",

    fields: {
        ...whereBaseFactory(GraphQLInt),
        ...whereOrderableFactory(GraphQLInt)
    }
});
export const WhereString = new GraphQLInputObjectType({
    name: "WhereString",
    description:
        "Restricts a string property to a combined series of conditions.",

    fields: {
        ...whereBaseFactory(GraphQLString),
        ...whereOrderableFactory(GraphQLString),
        contains: {
            type: GraphQLString,
            description: "The property contains this value, case-insensitively."
        },
        startsWith: {
            type: GraphQLString,
            description: "The property starts with this value."
        },
        endsWith: {
            type: GraphQLString,
            description: "The property ends with this value."
        }
    }
});
export const WhereDate = new GraphQLInputObjectType({
    name: "WhereDate",
    description:
        "Restricts a boolean property to a combined series of conditions.",

    fields: {
        ...whereBaseFactory(GraphQLDate),
        ...whereOrderableFactory(GraphQLDate)
    }
});
