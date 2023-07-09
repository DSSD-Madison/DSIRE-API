import express from "express"
import {graphqlHTTP} from "express-graphql"
import {PrismaClient} from "@prisma/client"

import schema from "./src/handlers/graphql/schema.mjs"


express().use("/graphiql", graphqlHTTP((request, response, GraphQLParams) => ({
    schema,
    context: {
        prisma: new PrismaClient()
    },
    graphiql: true
}))).listen(8080);
