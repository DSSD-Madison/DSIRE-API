import {APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda"

import * as handlers from "./handlers/handlers";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    const requestPath = '/' + event.path.split('/').slice(1).join('/');
    switch(requestPath) {

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
