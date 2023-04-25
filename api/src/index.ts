import {APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda"

import * as handlers from "./handlers/handlers";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    if (event.httpMethod == "OPTIONS") return {
        headers: {
            // TODO static URL
            "Access-Control-Allow-Origin": `https://dsire-api-hosting.s3.amazonaws.com`,
            "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
            "Access-Control-Allow-Headers" : "content-type"
        },
        statusCode: 200,
        body: ""
    }

    const requestPath = '/' + event.path.split('/').slice(1).join('/');
    switch(requestPath) {

        case "/graphql":
            return handlers.graphql(event);

        case "/query":
            return handlers.rest(event);

        case "/register":
            return handlers.register(event);

        case "/register/verify":
            return handlers.verify(event)

        case "/register/approve":
            return handlers.approve(event)

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
