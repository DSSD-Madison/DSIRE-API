import {Prisma} from "@prisma/client"
import {
  GraphQLBoolean as Boolean,
  GraphQLEnumType as Enum,
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as Int,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema,
  GraphQLString as String,
} from "graphql"

import {GraphQLContext as Context} from "./graphql.mjs"



type Program = Prisma.ProgramGetPayload<{
  include: {
    programCategory: true,
    programType: true,
    state: true,
    zips: {
      include: {
        zip: true
      }
    }
  }
}>


type Sortable = {
  field: string
  direction?: "asc" | "desc"
}


type Filterable = {
  field: string
  contains?: string
  inInts?: number[]
  inStrs?: string[]
  lt?: number
  gt?: number
}


function rename(input: string, map: Record<string, string>): string {
  return map[input] || input
}



const Sortable = new InputObjectType({
  name: "Sortable",
  fields: {

    field: {
      type: new NonNull(String),
      description: "Field to be sorted"
    },

    direction: {
      type: String,
      description: "Direction of sort: asc or desc",
      defaultValue: "asc"
    }
  }
});


const Filterable = new InputObjectType({
  name: "Filterable",
  fields: {

    field: {
      type: new NonNull(String),
      description: "Field to be filtered"
    },

    contains: {
      type: String,
      description: "Field contains some input string"
    },

    inInts: {
      type: new List(Int),
      description: "Field is in list of numbers"
    },

    inStrs: {
      type:new List(String),
      description: "Field is in list of words"
    },

    lt: {
      type: Int,
      description: "Field is less than number"
    },

    gt: {
      type: Int,
      description: "Field is greater than number"
    }
  }
});


const PageInfo = new ObjectType({
  name: "PageInfo",
  description: "Pagination status for the current query",
  fields: {

    hasPreviousPage: {
      type: new NonNull(Boolean),
      description: "Current page has a previous page"
    },

    hasNextPage: {
      type: new NonNull(Boolean),
      description: "Current page has a nect page"
    },

    page: {
      type: new NonNull(Int),
      description: "Page number"
    },

    previousPage: {
      type: Int,
      description: "Previous page number"
    },

    nextPage: {
      type: Int,
      description: "Next page number"
    }
  }
});


const ProgramCategoryId = new Enum({
  name: "ProgramCategoryId",
  description: "The filing category of the program: either \"financial incentive\" or \"regulatory policy\"",
  values: {

    FINANICAL_INCENTIVE: {
      value: 1,
      description: "Financial Incentive"
    },

    REGULATORY_POLICY: {
      value: 2,
      description: "Regulatory Policy"
    }
  }
});

const ProgramCategory = new ObjectType({
  name: "ProgramCategory",
  description: "The filing category of the program; either a \"Financial Incentive\" or a \"Regulatory Policy\"",
  fields: {

    id: {
      type: ProgramCategoryId,
      description: "Program category id: FINANCIAL_INCENTIVE or REGULATORY_POLICY"
    },

    name: {
      type: String,
      description: "Program category name: Financial incentive or Regulatory Policy"
    }
  }
});


const StateId = new Enum({
  name: "StateId",
  description: "A US state or territory",
  values: {
    AL: {
      value: 1,
      description: "Alabama"
    },
    AK: {
      value: 2,
      description: "Alaska"
    },
    AZ: {
      value: 3,
      description: "Arizona"
    },
    AS: {
      value: 4,
      description: "American Samoa"
    },
    AR: {
      value: 5,
      description: "Arkansas"
    },
    CA: {
      value: 6,
      description: "California"
    },
    CO: {
      value: 7,
      description: "Colorado"
    },
    CT: {
      value: 8,
      description: "Conneticut"
    },
    DE: {
      value: 9,
      description: "Delaware"
    },
    DC: {
      value: 10,
      description: "Washington, D.C."
    },
    US: {
      value: 11,
      description: "Federal"
    },
    FL: {
      value: 12,
      description: "Florida"
    },
    GA: {
      value: 13,
      description: "Georgia"
    },
    GU: {
      value: 14,
      description: "Guam"
    },
    HI: {
      value: 15,
      description: "Hawaii"
    },
    ID: {
      value: 16,
      description: "Idaho"
    },
    IL: {
      value: 17,
      description: "Illinois"
    },
    IN: {
      value: 18,
      description: "Indiana"
    },
    IA: {
      value: 19,
      description: "Iowa"
    },
    KS: {
      value: 20,
      description: "Kansas"
    },
    KY: {
      value: 21,
      description: "Kentucky"
    },
    LA: {
      value: 22,
      description: "Louisiana"
    },
    ME: {
      value: 23,
      description: "Maine"
    },
    MD: {
      value: 24,
      description: "Maryland"
    },
    MA: {
      value: 25,
      description: "Massachusetts"
    },
    MI: {
      value: 26,
      description: "Michigan"
    },
    MN: {
      value: 27,
      description: "Minnesota"
    },
    MS: {
      value: 28,
      description: "Mississippi"
    },
    MO: {
      value: 29,
      description: "Missouri"
    },
    MT: {
      value: 30,
      description: "Montana"
    },
    MP: {
      value: 31,
      description: "N. Mariana Islands"
    },
    NE: {
      value: 32,
      description: "Nebraska"
    },
    NV: {
      value: 33,
      description: "Nevada"
    },
    NH: {
      value: 34,
      description: "New Hampshire"
    },
    NJ: {
      value: 35,
      description: "New Jersey"
    },
    NM: {
      value: 36,
      description: "New Mexico"
    },
    NY: {
      value: 37,
      description: "New York"
    },
    NC: {
      value: 38,
      description: "North Carolina"
    },
    ND: {
      value: 39,
      description: "North Dakota"
    },
    OH: {
      value: 40,
      description: "Ohio"
    },
    OK: {
      value: 41,
      description: "Oklahoma"
    },
    OR: {
      value: 42,
      description: "Oregon"
    },
    PW: {
      value: 43,
      description: "Palau"
    },
    PA: {
      value: 44,
      description: "Pennsylvania"
    },
    PR: {
      value: 45,
      description: "Puerto Rico"
    },
    RI: {
      value: 46,
      description: "Rhode Island"
    },
    SC: {
      value: 47,
      description: "South Carolina"
    },
    SD: {
      value: 48,
      description: "South Dakota"
    },
    TN: {
      value: 49,
      description: "Tennessee"
    },
    TX: {
      value: 50,
      description: "Texas"
    },
    UT: {
      value: 51,
      description: "Utah"
    },
    VT: {
      value: 52,
      description: "Vermont"
    },
    VI: {
      value: 53,
      description: "U.S. Virgin Islands"
    },
    VA: {
      value: 54,
      description: "Virginia"
    },
    WA: {
      value: 55,
      description: "Washington"
    },
    WV: {
      value: 56,
      description: "West Virginia"
    },
    WI: {
      value: 57,
      description: "Wisconsin"
    },
    WY: {
      value: 58,
      description: "Wyoming"
    },
    MH: {
      value: 59,
      description: "Marshall Islands"
    },
    FM: {
      value: 60,
      description: "Federated States of Micronesia"
    }
  }
});

const State = new ObjectType({
  name: "State",
  description: "A US state or territory",
  fields: {

    id: {
      type: StateId,
      description: "State abbreviation"
    },

    name: {
      type: String,
      description: "State name"
    }
  }
});


const Program = new ObjectType({
  name: "Program",
  description: "A financial incentive or regulatory policy",
  fields: {

    name: {
      type: String,
      description: "The official title of the program"
    },

    url: {
      type: String,
      description: "The program website"
    },

    startDate: {
      type: String,
      description: "The program start date",
      resolve: (obj: Program) => obj.startDate ? new Date(obj.startDate).toDateString() : null
    },

    endDate: {
      type: String,
      description: "The program end date"
    },

    summary: {
      type: String,
      description: "The program summary"
    },

    programCategory: {
      type: ProgramCategory,
      description: "The program category: Financial Incentive or  Regulatory Policy"
    },

    programType: {
      type: String,
      description: "The program type i.e. Personal Tax Deduction",
      resolve: (obj: Program) => obj.programType.name
    },

    state: {
      type: State,
      description: "The US state or territory implementing this program"
    },

    zips: {
      type: new List(String),
      description: "Program's applicable zipcods",
      resolve: (obj: Program) => obj.zips.map(programZip => programZip.zip.code)
    }
  }
});



export default new Schema({
  query: new ObjectType({
    name: "Query",
    description: "root",
    fields: {

      programs: {
        type: new ObjectType({
          name: "QueryResults",
          description: "JSON formatted query results",
          fields: {

            results: {
              type: new List(Program),
              description: "List of programs resulting from query"
            },

            pageInfo: {
              type: PageInfo,
              description: "Page information for current query"
            }
          },
        }),
        description: "hi",
        args: {

          page: {
            type: Int,
            description: "Query a specific page",
            defaultValue: 0
          },

          pageSize: {
            type: Int,
            description: "After...",
            defaultValue: 25
          },

          filter: {
            type: new List(Filterable),
            description: "List of query filters"
          },

          sort: {
            type: new List(Sortable),
            description: "List of query result orderings"
          }
        },
        resolve: async (obj, args, ctx: Context, info) => {

          // TODO function these
          const where: Record<string, any> = {};
          if (args.filter) {
            (args.filter as Filterable[]).forEach(filter => {
              const {field, ...constraints} = filter;
              for (const [key, value] of Object.entries(constraints)) {
                const constraint = key as keyof typeof filter
                if (filter[constraint] && value) {
                  where[field] ||= {};
                  where[field][rename(constraint, {inInts: "in", inStrs: "in"})] = value;
                }
              }
            });
          }

          const orderBy: Record<string, any> = {};
          if (args.sort) {
            (args.sort as Sortable[]).forEach(sortable => {
              const {field, ...constraints} = sortable;
              for (const [key, value] of Object.entries(constraints)) {
                const constraint = key as keyof typeof sortable;
                if (sortable[constraint] && value) {
                  orderBy[field] ||= {}
                  orderBy[field][constraint] = value;
                }
              }
            });
          }

          const programs = await ctx.prisma.program.findMany({
            where,
            orderBy,
            include: {
              programCategory: true,
              programType: true,
              state: true,
              zips: {
                include: {
                  zip: true
                }
              }
            },
            skip: args.page * args.pageSize,
            take: args.pageSize
          });

          const pageData = {
            // TODO
            hasNextPage: true,
            hasPreviousPage: true,
            nextPage: args.page + 1,
            previousPage: args.page - 1,
            page: args.page
          };

          return {
            results: programs,
            pageInfo: pageData
          }
        }
      }
    }
  })
});
