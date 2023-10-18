import {GraphQLObjectType, GraphQLSchema} from "graphql";

import ProgramRepository from "../persistence/repositories/Program";
import {Program, WhereProgram} from "./types/persistence/Program";
import ImplementingSectorRepository from "../persistence/repositories/ImplementingSector";
import {
    ImplementingSector,
    WhereImplementingSector
} from "./types/persistence/ImplementingSector";
import queryFieldTypeArgs from "./queryFieldTypeArgs";


export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "The root GraphQL query object.",

        fields: {
            program: {
                ...queryFieldTypeArgs({
                    name: "ProgramQuery",
                    scalarName: "program",
                    type: Program,
                    whereType: WhereProgram
                }),
                resolve: async (object, args, context, info) => ({
                    data: await ProgramRepository.get(args.page, args.where),
                    page: {
                        limit: args.page.limit,
                        offset: args.page.offset
                    }
                })
            },
            implementing_sector: {
                ...queryFieldTypeArgs({
                    name: "ImplementingSectorQuery",
                    scalarName: "implementing sector",
                    type: ImplementingSector,
                    whereType: WhereImplementingSector
                }),
                resolve: async (object, args, context, info) => ({
                    data: await ImplementingSectorRepository.get(
                        args.page,
                        args.where
                    ),
                    page: {
                        limit: args.page.limit,
                        offset: args.page.offset
                    }
                })
            }
        }
    })
});
