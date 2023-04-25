import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"
import {z} from 'zod';

import {CORS_HEADERS} from "./headers"
import schema from "./graphql/schema"

export default async function rest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    const received_event = JSON.stringify(event,null,2)

    /*if(event.queryStringParameters == undefined){
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
    else{
        const params = event.queryStringParameters.split(',').slice(1).join(',');
    }

    

    const data = z.object({
        states: z.string().optional(),
        category: z.string().optional(),
        pageSize: z.string().optional(),
        page: z.string().optional()
    });

    const parsed_data = (inputs: unknown) => {
        const parsed = data.parse(event.queryStringParameters);
        return parsed;
    }*/

    const params = event.queryStringParameters

    //const formData = event.safeParse(typeof(event.queryStringParameters) === "string" ? JSON.parse(event.queryStringParameters) : event.queryStringParameters);
    //const {query, operationName, variableValues} = JSON.parse(event.body as any)
    

    return {
        headers: {
            ...CORS_HEADERS,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: received_event || ' '
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