import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"

import {CORS_HEADERS} from "./headers"
import schema from "./graphql/schema"

export default async function rest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    //const {query, operationName, variableValues} = JSON.parse(event.body as any)
    const params = JSON.parse(event.queryStringParameters as any)

    return {
        headers: {
            ...CORS_HEADERS,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify(params) || ' '
    }

    /*return {
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
    }*/
}