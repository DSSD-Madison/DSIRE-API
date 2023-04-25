import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"
import {z} from 'zod';

import {CORS_HEADERS} from "./headers"
import schema from "./graphql/schema"

export default async function rest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters == null){
        return {
            headers: {
                ...CORS_HEADERS,
                "content-type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(await GraphQL({
                schema: schema,
                source: ""
            }))
        }
    }

    const received_event = JSON.stringify(event,null,2);
    const data_arr = JSON.parse(received_event);
    const data = data_arr["queryStringParameters"];
    //const params_arr = received_event.match('"queryStringParameters": {[\s\S]+?}')
    //const params = params_arr ? params_arr[0] : "hi"

    return {
        headers: {
            ...CORS_HEADERS,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: data || ' '
    }

    

    /*const data = z.object({
        states: z.string().optional(),
        category: z.string().optional(),
        pageSize: z.string().optional(),
        page: z.string().optional()
    });

    const parsed_data = (inputs: unknown) => {
        const parsed = data.parse(event.queryStringParameters);
        return parsed;
    }*/

    //const formData = event.safeParse(typeof(event.queryStringParameters) === "string" ? JSON.parse(event.queryStringParameters) : event.queryStringParameters);
    //const {query, operationName, variableValues} = JSON.parse(event.body as any)
    

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