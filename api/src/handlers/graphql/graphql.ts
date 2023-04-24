import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"

import {CORS_HEADERS} from "../headers"
import schema from "./schema"


export type GraphQLContext = {
    prisma: PrismaClient
}

export default async function graphql(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    // TODO check bad body
    const {query, operationName, variableValues} = JSON.parse(event.body as any)

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
            source: query,
            operationName,
            variableValues
        }))
    }
}
