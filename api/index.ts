import {APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda"

import registerHandler from "./registerHandler"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    const requestPath = '/' + event.path.split('/').slice(1).join('/');
    switch(requestPath) {

        case "/register":
            return registerHandler(event);

        default:
            return {
                statusCode: 404,
                body: JSON.stringify({
                    code: 404,
                    message: `Unknown endpoint ${requestPath}`
                })
            }
    }
}
