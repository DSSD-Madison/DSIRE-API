import {
  GraphQLEnumType as QLEnum,
  GraphQLError as QLError,
  GraphQLInputObjectType as QLInputObject,
  GraphQLInt as QLInt,
  GraphQLList as QLList,
  GraphQLNonNull as QLNonNull,
  GraphQLObjectType as QLObject,
  GraphQLString as QLString
} from "graphql"
import {Prisma} from "@prisma/client"
import {z} from "zod"

import {ProgramCategoryId, ProgramCategoryId_t} from "./program"
import { StateId } from "./state";


export const IntFilter_t = z.object({
  equals: z.number().optional(),
  not: z.number(),
  in: z.number().array(),
  notIn: z.number().array(),
  lt: z.number(),
  lte: z.number(),
  gt: z.number(),
  gte: z.number()
}).partial();
export const IntFilter = new QLInputObject({
  name: "IntFilter",
  description: "Restricts an integer field to a series of conditions.",
  fields: {

    equals: {
      type: QLInt,
      description: "The field equals only this value."
    },

    not: {
      type: QLInt,
      description: "The field does not equal this value."
    },

    in: {
      type: new QLList(QLInt),
      description: "The field equals any one of these values."
    },

    notIn: {
      type: new QLList(QLInt),
      description: "The field does not equal any one of these values."
    },

    lt: {
      type: QLInt,
      description: "The field is strictly less than this value."
    },

    lte: {
      type: QLInt,
      description: "The field is less than or equal to this value."
    },

    gt: {
      type: QLInt,
      description: "The field is strictly greater than this value."
    },

    gte: {
      type: QLInt,
      description: "The field is greater than or equal to this value."
    }
  }
});

export const StringFilter_t = z.object({
  equals: z.string(),
  not: z.string(),
  in: z.string().array(),
  notIn: z.string().array(),
  lt: z.string(),
  lte: z.string(),
  gt: z.string(),
  gte: z.string(),
  contains: z.string(),
  startsWith: z.string(),
  endsWith: z.string(),
}).partial();
export const StringFilter = new QLInputObject({
  name: "StringFilter",
  description: "Restricts a string field to a series of conditions.",
  fields: {

    equals: {
      type: QLString,
      description: "The field equals only this value."
    },

    not: {
      type: QLString,
      description: "The field does not equal this value."
    },

    in: {
      type: new QLList(QLString),
      description: "The field equals any one of these values."
    },

    notIn: {
      type: new QLList(QLString),
      description: "The field does not equal any one of these values."
    },

    lt: {
      type: QLString,
      description: "The field is alphabetically before this value."
    },

    lte: {
      type: QLString,
      description: "The field is alphabetically before or the same as this value."
    },

    gt: {
      type: QLString,
      description: "The field is alphabetically after this value."
    },

    gte: {
      type: QLString,
      description: "The field is alphabetically after or the same as this value."
    },

    contains: {
      type: QLString,
      description: "The field contains this value, case-insensitively."
    },

    startsWith: {
      type: QLString,
      description: "The field starts with this value."
    },

    endsWith: {
      type: QLString,
      description: "The field ends with this value."
    }
  }
});

export const DateFilter_t = z.object({
  equals: z.date(),
  not: z.date(),
  in: z.date().array(),
  notIn: z.date().array(),
  lt: z.date(),
  lte: z.date(),
  gt: z.date(),
  gte: z.date()
}).partial();
export const DateFilter = new QLInputObject({
  name: "DateFilter",
  description: "Restricts a date field to a series of conditions.",
  fields: {

    equals: {
      type: QLString,
      description: "The field equals only this value."
    },

    not: {
      type: QLString,
      description: "The field does not equal this value."
    },

    in: {
      type: new QLList(QLString),
      description: "The field equals any one of these values."
    },

    notIn: {
      type: new QLList(QLString),
      description: "The field does not equal any one of these values."
    },

    lt: {
      type: QLString,
      description: "The field occurs before this value."
    },

    lte: {
      type: QLString,
      description: "The field occurs before or on this value."
    },

    gt: {
      type: QLString,
      description: "The field occurs after this value."
    },

    gte: {
      type: QLString,
      description: "The field occurs after or on this value."
    }
  }
});

export const ProgramCategoryIdFilter_t = z.object({
  equals: z.number(),
  not: z.number(),
  in: z.number().array(),
  notIn: z.number().array()
}).partial();
export const ProgramCategoryIdFilter = new QLInputObject({
  name: "ProgramCategoryIdFilter",
  description: "Restricts a program category ID field to a series of constraints.",
  fields: {

    equals: {
      type: ProgramCategoryId,
      description: "The field is of this Program Category."
    },

    not: {
      type: ProgramCategoryId,
      description: "The field is not of this Program Category."
    },

    in: {
      type: new QLList(ProgramCategoryId),
      description: "The field belongs to any of these Program Categories."
    },

    notIn: {
      type: new QLList(ProgramCategoryId),
      description: "The field does not belong to any of these Program Categories."
    }
  }
});

export const ProgramCategoryFilter_t = z.object({
  id: ProgramCategoryIdFilter_t,
  name: StringFilter_t
}).partial();
export const ProgramCategoryFilter = new QLInputObject({
  name: "ProgramCategoryFilter",
  description: "Restricts a program category field to a series of constraints.",
  fields: {

    id: {
      type: ProgramCategoryIdFilter,
      description: "Program category id: REGULATORY_POLICY or FINANCIAL_INCENTIVE"
    },

    name: {
      type: StringFilter,
      description: "Program category name: Regulatory Policy or Financial Incentive"
    }
  }
});

export const ProgramTypeFilter_t = z.object({
  name: z.string()
}).partial();
export const ProgramTypeFilter = new QLInputObject({
  name: "ProgramTypeFilter",
  description: "Filter program type by name",
  fields: {

    name: {
      type: StringFilter,
      description: "Name of program type i.e Personal Tax Deduction"
    }
  }
});

export const StateFilter_t = z.object({
  id: z.number(),
  name: StringFilter_t
}).partial();
export const StateFilter = new QLInputObject({
  name: "StateFilter",
  description: "Restricts a program state field to a series of constraints.",
  fields: {

    id: {
      type: StateId,
      description: "State abbreviation"
    },

    name: {
      type: StringFilter,
      description: "State name"
    }
  }
});

export const ProgramFilter_t = z.object({
  name: StringFilter_t,
  url: StringFilter_t,
  startDate: DateFilter_t,
  endDate: DateFilter_t,
  summary: StringFilter_t,
  programCategory: ProgramCategoryFilter_t,
  programType: ProgramTypeFilter_t,
  state: StateFilter_t
}).partial().optional();
export const ProgramFilter = new QLInputObject({
  name: "ProgramFilter",
  description: "Restricts programs to a series of contraints on their fields.",
  fields: {

    name: {
      type: StringFilter,
      description: "Restricts programs based on their name."
    },

    url: {
      type: StringFilter,
      description: "Restricts programs based on their URL."
    },

    startDate: {
      type: DateFilter,
      description: "Restricts programs based on their starting date."
    },

    endDate: {
      type: DateFilter,
      description: "Restricts programs based on their ending date."
    },

    summary: {
      type: StringFilter,
      description: "Restricts programs based on their summary."
    },

    programCategory: {
      type: ProgramCategoryFilter,
      description: "Restricts programs based on their name."
    },

    programType: {
      type: StringFilter,
      description: "Restricts programs based on their program type."
    },
    
    state: {
      type: StateFilter,
      description: "Restricts programs based on the states that implement them."
    }
  }
});


export function filtersToPrismaWhere<T extends z.ZodTypeAny>(
  filterData: {
    where?: object
    whereAnd?: object[]
    whereOr?: object[]
    whereNot?: object[]
  },
  filter_t: T
): z.infer<T> & {
  AND: NonNullable<z.infer<T>>[] | undefined
  OR: NonNullable<z.infer<T>>[] | undefined
  NOT: NonNullable<z.infer<T>>[] | undefined
} {

  let result = {}
  try {
    result = {
      ...filter_t.parse(filterData.where),
      AND: filterData.whereAnd?.map(filter => filter_t.parse(filter)),
      OR: filterData.whereOr?.map(filter => filter_t.parse(filter)),
      NOT: filterData.whereNot?.map(filter => filter_t.parse(filter))
    }
  }
  catch (e) {
    throw new QLError("oopsies",
      )
  }
  //@ts-ignore
  return result;
}
