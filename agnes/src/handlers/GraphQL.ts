import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql} from "graphql"

import schema from "./GraphQL/schema"


export interface GraphQLContext {}

export default async function GraphQL(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    // TODO check bad body
    const {query, operationName, variableValues} = JSON.parse(event.body as any)

    return {
        headers: {
            "content-type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify(await graphql({
            schema: schema,
            contextValue: {},
            source: query,
            operationName,
            variableValues
        }))
    }
}
