import {Prisma, PrismaClient} from "@prisma/client"
import {
    GraphQLEnumType as QLEnum,
    GraphQLInputObjectType as QLInputObject,
    GraphQLInt as QLInt,
    GraphQLList as QLList,
    GraphQLNonNull as QLNonNull,
    GraphQLObjectType as QLObject,
    GraphQLString as QLString
} from "graphql"
import {z} from "zod"

import {PageInfo, PageInfo_t} from "./pagination"
import {State, State_t} from "./state"


export enum ProgramCategoryId_t {
    FINANICAL_INCENTIVE,
    REGULATORY_POLICY
}
export const ProgramCategoryId = new QLEnum({
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

export type ProgramCategory_t = {
  id: ProgramCategory_t
  name: string
}
export const ProgramCategory = new QLObject({
  name: "ProgramCategory",
  description: "The filing category of the program; either a \"Financial Incentive\" or a \"Regulatory Policy\"",
  fields: {

    id: {
      type: new QLNonNull(ProgramCategoryId),
      description: "hi"
    },

    name: {
      type: new QLNonNull(QLString),
      description: "hi"
    }
  }
});

export const programRelations = {
  programCategory: true,
  programType: true,
  state: true,
  zips: {
    include: {
      zip: true
    }
  }
}
export type Program_t = Prisma.ProgramGetPayload<{include: typeof programRelations}>
export const Program = new QLObject({
  name: "Program",
  description: "A sustainability incentive catalogued by EnergySage.",
  fields: {

    name: {
      type: QLString,
      description: "The official title of the program"
    },

    url: {
      type: QLString,
      description: "hi"
    },

    startDate: {
      type: QLString,
      description: "hi",
      resolve: (obj: Program_t) => obj.startDate ? new Date(obj.startDate).toDateString() : null
    },

    endDate: {
      type: QLString,
      description: "hi"
    },

    summary: {
      type: QLString,
      description: "hi"
    },

    programCategory: {
      type: ProgramCategory,
      description: "hi"
    },

    programType: {
      type: QLString,
      description: "hi",
      resolve: (obj: Program_t) => obj.programType.name
    },

    state: {
      type: State,
      description: "The US state or territory implementing this program"
    },

    zips: {
      type: new QLList(QLString),
      description: "hi",
      resolve: (obj: Program_t) => obj.zips.map(programZip => programZip.zip.code)
    }
  }
});

export type ProgramQueryResult_t = {
  data: Program_t[]
  pageInfo: PageInfo_t
}
export const ProgramQueryResult = new QLObject({
  name: "ProgramQueryResult",
  description: "The result of a Programs query.",
  fields: {

    data: {
      type: new QLList(Program),
      description: "A list of programs which matched the query."
    },

    pageInfo: {
      type: PageInfo,
      description: "The pagination information, relative to the current page of the query."
    }
  }
});
