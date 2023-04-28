import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"
import {z} from 'zod';

import {CORS_HEADERS} from "./headers"
import schema from "./graphql/schema"

export default async function rest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    const params = JSON.stringify(event.queryStringParameters);
    const re = new RegExp(':', 'g');
    //console.log('2016-01-02|2019-03-07'.matchAll(re));
    let m = re.exec(params);
    let m_str = m?.toString();
    /*if(event.queryStringParameters == null){
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
    }*/

    return {
        headers: {
            ...CORS_HEADERS,
            "content-type": "application/json"
        },
        statusCode: 200,
        body: m_str || ' '
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