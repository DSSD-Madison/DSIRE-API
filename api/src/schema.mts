import {
    arg,
    enumType,
    intArg,
    makeSchema,
    objectType,
    stringArg
} from 'nexus'
import { Context } from './context.mjs'
import { join } from 'path'

// npx ts-node-dev --transpile-only --no-notify api/server.ts

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allPrograms', {
            type: 'Program',
            resolve: (_, _args, context: Context) => {
                return context.prisma.program.findMany({take:50})
            },
        })


        t.nonNull.list.nonNull.field('programs', {
            type: 'Program',
            args: {
                category: arg({type: CategoryEnum}),
                state: arg({type: StateEnum}),
                pageSize: intArg(),
            },
            resolve: (_, args, context: Context) => {

                return context.prisma.program.findMany({
                    where: {
                        program_category: {id: args.category || undefined},
                        state: {id: args.state || undefined},
                    },
                    take: args.pageSize || undefined
                })
            },
        })
    }


})

const Program = objectType({
    name: 'Program',
    definition(t) {
        t.nonNull.int('id')
        t.string('name')
        t.field('state', {
            type: 'State',
            resolve: (parent, _, context: Context) => {
                return context.prisma.program
                  .findUnique({
                    where: { id: parent.id || undefined },
                  })
                  .state()
              },
        })

        t.field('program_Category', {
            type: 'ProgramCategory',
            resolve: (parent, _, context: Context) => {
                return context.prisma.program
                  .findUnique({
                    where: { id: parent.id || undefined },
                  })
                  .program_category()
              },
        })

    }
})

const State = objectType({
    name: 'State',
    definition(t) {
        t.nonNull.int('id')
        t.string('name')
    }
})


const ProgramCategory = objectType({
    name: 'ProgramCategory',
    definition(t) {
        t.nonNull.int('id')
        t.string('name')
    }
})



const CategoryEnum = enumType({
    name: 'CategoryEnum',
    members: {
      FI: 1,
      RP: 2,
    },
})

const StateEnum = enumType({
    name: 'StateEnum',
    members: {
        AL: 1,
        AK: 2,
        AZ: 3,
        AS: 4,
        AR: 5,
        CA: 6,
        CO: 7,
        CT: 8,
        DE: 9,
        DC: 10,
        US: 11,
        FL: 12,
        GA: 13,
        GU: 14,
        HI: 15,
        ID: 16,
        IL: 17,
        IN: 18,
        IA: 19,
        KS: 20,
        KY: 21,
        LA: 22,
        ME: 23,
        MD: 24,
        MA: 25,
        MI: 26,
        MN: 27,
        MS: 28,
        MO: 29,
        MT: 30,
        MP: 31,
        NE: 32,
        NV: 33,
        NH: 34,
        NJ: 35,
        NM: 36,
        NY: 37,
        NC: 38,
        ND: 39,
        OH: 40,
        OK: 41,
        OR: 42,
        PW: 43,
        PA: 44,
        PR: 45,
        RI: 46,
        SC: 47,
        SD: 48,
        TN: 49,
        TX: 50,
        UT: 51,
        VT: 52,
        VI: 53,
        VA: 54,
        WA: 55,
        WV: 56,
        WI: 57,
        WY: 58,
        MH: 59,
        FM: 60
    },
})



export const schema = makeSchema({
  types: [
    Query,
    Program,
    State,
    ProgramCategory,
    CategoryEnum,
    StateEnum
  ], // 1
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  }, contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
