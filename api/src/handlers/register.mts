import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"

import mailTransport from "../mailTransport.mjs"
import {mintJWE, mintJWS} from "../crypto.mjs"
import verifyTemplate from "../email-templates/verify.mjs"
import {Validator} from "node-input-validator"

export default async function register(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    // Real requests come in as strings, the console tester injects an object; handle both
    const formData: {
        name: string
        email: string
        org: string
    } = typeof(event.body) === "string" ? JSON.parse(event.body) : event.body

    // Add Validation here
    const v = new Validator(
        {name: formData.name, email: formData.email, organization: formData.org},
        {name: 'required|minLength:5', email: 'required|email', organization: 'required'}
    );

    const matched = await v.check();

    if(!matched){
        const response = ({
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Headers" : "content-type",
                "Access-Control-Allow-Origin": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com`,
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            statusCode: 422,
            body: JSON.stringify({
                code: 422,
                messages: {
                    name: v.errors?.name?.message,
                    email: v.errors?.email?.message,
                    org: v.errors?.org?.message
                }
            })
        });
        return response;
    }

    // TODO reduce TTK
    const verifyJWE = await mintJWE(await mintJWS(formData, "verify", "24h"))
    const verifyLink = `${process.env.ROOT_API_URL}/${process.env.STAGE}/register/verify?token=${verifyJWE}`

    return mailTransport.sendMail({
        from: process.env.IDENTITY_EMAIL,
        to: formData.email,
        subject: "DSIRE API: Verify your email to continue",
        html: verifyTemplate(formData.email, verifyLink)
    }).then(info => ({
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Headers" : "content-type",
            "Access-Control-Allow-Origin": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com`,
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        statusCode: 200,
        body: JSON.stringify({
            code: 200,
            message: "OK"
        })
    })).catch(error => ({
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Headers" : "content-type",
            "Access-Control-Allow-Origin": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com`,
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        statusCode: 400,
        body: JSON.stringify({
            code: 400,
            message: `Failed to send approval email to user ${formData.name}: ${error}`
        })
    }));
}
