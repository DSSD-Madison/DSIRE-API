import {
    APIGatewayEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from "aws-lambda";
import {graphql} from "graphql";

import schema from "./GraphQL/schema";
import * as headers from "./headers";


export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "OPTIONS")
        return {
            headers: {
                ...headers.cors
            },
            statusCode: 200,
            body: ""
        };
    if (event.httpMethod !== "POST")
        return {
            headers: {
                "content-type": "application/json"
            },
            statusCode: 404,
            body: JSON.stringify({
                code: 404,
                message: `Only HTTP OPTIONS and POST are permitted (received ${event.httpMethod})`
            })
        };

    // Web requests come in as strings, AWS requests are already objects; support both
    if (typeof event.body === "string") event.body = JSON.parse(event.body);
    // HACK Configured for Apollo Explorer; may be non-standard for HTTP GraphQL (and should be verified)
    const {operationName, query, variables} = event.body as any;

    return {
        headers: {
            ...headers.cors,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify(
            await graphql({
                schema,
                operationName: operationName,
                source: query,
                variableValues: variables
            })
        )
    };
};
