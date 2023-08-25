import {APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda"

import * as handlers from "./handlers";
import * as headers from "./headers";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    if (event.httpMethod === "OPTIONS") return {
        headers: {
            ...headers.cors
        },
        statusCode: 200,
        body: ""
    }

    // /api/graphql/hello/world
    const requestPath = '/' + event.path.split('/').slice(2).join('/');
    switch (requestPath) {

        // case "/graphql":
        //     return handlers.graphql(event);

        default:
            return {
                headers: {
                    "content-type": "application/json"
                },
                statusCode: 404,
                body: JSON.stringify({
                    code: 404,
                    message: `Unknown endpoint ${requestPath}`
                })
            }
    }
}
