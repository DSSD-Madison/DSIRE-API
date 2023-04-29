import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {graphql as GraphQL} from "graphql"
import {PrismaClient} from "@prisma/client"
import {z} from 'zod';

import {CORS_HEADERS} from "./headers"
import schema from "./graphql/schema"

export default async function rest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    const param_str = JSON.stringify(event.queryStringParameters);
    const params: Map<string, number> = new Map();
    JSON.parse(param_str, (key, value) => {
        params.set(key,value);
    });
    let query = ""
    if("states" in params && "category" in params){
        query = `{programs(whereAnd:{programType:{${params.get('category')}},states:{${params.get('states')}}}`
    }
    else{
        if("states" in params){
            query = `{programs(where:{states:{${params.get('states')}}}`
        }
        else{
            if("category" in params){
                query = `{programs(whereAnd:{programType:{${params.get('category')}}}`
            }
            else{
                //NO FILTERS
            }
        }
    }

    if("page" in params && "pageSize" in params){
        query += `page: Page = {skip: ${params.get('page')} take: ${params.get('pageSize')}})`
    }
    else{
        if("page" in params){
            query += `page: Page = {skip: ${params.get('page')} take: 50})`
        }
        else{
            if("pageSize" in params){
                query += `page: Page = {skip: 0 take: ${params.get('pageSize')}})`
            }
            else{
                query += `page: Page = {skip: 0 take: 50}})`
            }
        }
    }

    return {
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
            "GET",
            null
        }))
    }
}