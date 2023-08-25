import {
    GraphQLBoolean as QLBoolean,
    GraphQLInputObjectType as QLInputObject,
    GraphQLInt as QLInt,
    GraphQLNonNull as QLNonNull,
    GraphQLObjectType as QLObject
} from "graphql"


export type Page_t = {
  skip: number
  take: number
}
export const Page = new QLInputObject({
  name: "Page",
  description: "Specifies the pagination information for a query.",
  fields: {

    skip: {
      type: new QLNonNull(QLInt),
      description: "Queries this page of the results."
    },

    take: {
      type: new QLNonNull(QLInt),
      description: "Retrieves this many results per page."
    }
  }
});

export type PageInfo_t = {
    hasPreviousPage: boolean
    hasNextPage: boolean
    page: number
    previousPage: number
    nextPage: number
}
export const PageInfo = new QLObject({
    name: "PageInfo",
    description: "Pagination status for the current query",
    fields: {

      hasPreviousPage: {
        type: new QLNonNull(QLBoolean),
        description: "hi"
      },

      hasNextPage: {
        type: new QLNonNull(QLBoolean),
        description: "hi"
      },

      page: {
        type: new QLNonNull(QLInt),
        description: "hi"
      },

      previousPage: {
        type: new QLNonNull(QLInt),
        description: "hi"
      },

      nextPage: {
        type: new QLNonNull(QLInt),
        description: "hi"
      }
    }
  });
