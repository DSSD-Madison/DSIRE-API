import {
  GraphQLList as QLList,
  GraphQLNonNull as QLNonNull,
  GraphQLObjectType as QLObject,
  GraphQLSchema as QLSchema
} from "graphql"
import {Prisma} from "@prisma/client"

import {GraphQLContext as QLContext} from "./graphql"
import {
  Page, Page_t,
  PageInfo, PageInfo_t
} from "./types/pagination"
import {
  Program, Program_t,
  ProgramQueryResult, ProgramQueryResult_t,
  programRelations
} from "./types/program"
import {
  ProgramFilter, ProgramFilter_t,
  filtersToPrismaWhere
} from "./types/filters"
import {State, State_t} from "./types/state"


export default new QLSchema({
  query: new QLObject({
    name: "Query",
    description: "The root GraphQL query object.",
    fields: {

      programs: {
        type: ProgramQueryResult,
        description: "Queries among all of the sustainability incentive programs known to EnergySage.",
        args: {

          where: {
            type: ProgramFilter,
            description: "Limits the programs returned to a series of constraints."
          },

          whereAnd: {
            type: new QLList(ProgramFilter),
            description: "Limits the programs returned to a contingent series of constraints."
          },

          whereOr: {
            type: new QLList(ProgramFilter),
            description: "Limits the programs returned to any of a series of constraints."
          },

          whereNot: {
            type: new QLList(ProgramFilter),
            description: "Limits the programs returned to anything other than a continent series of constraints."
          },

          page: {
            type: Page,
            description: "Specifies the pagination information for this query.",
            defaultValue: {
              skip: 0,
              take: 20
            }
          }

        },
        resolve: async (obj, args, ctx: QLContext, info) => {

            const tryd = filtersToPrismaWhere({
              where: args.where,
              whereAnd: args.whereAnd,
              whereOr: args.whereOr,
              whereNot: args.whereNot
            }, ProgramFilter_t);

            console.log(tryd);



          const programs = await ctx.prisma.program.findMany({
            where: tryd,
            include: programRelations,

            skip: (args.page as Page_t).skip,
            take: (args.page as Page_t).take
          });

          return {
            data: programs,
            pageInfo: null
          }
        }
      }
    }
  })
});
