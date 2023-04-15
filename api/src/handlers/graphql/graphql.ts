import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"

import {CORS_HEADERS} from "../headers"
import schema from "./schema"


export type GraphQLContext = {
    prisma: PrismaClient
}

export default async function graphql(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    return {
        headers: {
            ...CORS_HEADERS,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify(await GraphQL({
            schema: schema,
            contextValue: {
                prisma: new PrismaClient()
            },
            // TODO check bad body
            source: event.body || ""
        }))
    }
}
