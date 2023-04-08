import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {z} from "zod"

import mailTransport from "../mailTransport.mjs"
import {mintJWE, mintJWS} from "../crypto.mjs"
import verifyTemplate from "../email-templates/verify.mjs"

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com`,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers" : "content-type"
}
const RESPONSE_HEADERS = {
    ...CORS_HEADERS,
    "content-type": "application/json"
}


export default async function register(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    const zRegisterForm = z.object({
        name: z.string({
            required_error: "Contact name is required"
        }).min(1, "Contact name is required"),
        email: z.string({
            required_error: "Contact email is required"
        }).email("Email is invalid"),
        org: z.string({
            required_error: "Contact's organization is required"
        }).min(1, "Contact's organization is required")
    }).required();

    // Real requests come in as strings, the console tester injects an object; handle both
    const formData = zRegisterForm.safeParse(typeof(event.body) === "string" ? JSON.parse(event.body) : event.body);
    if (!formData.success) return {
        headers: RESPONSE_HEADERS,
        statusCode: 400,
        body: JSON.stringify({
            code: 400,
            message: formData.error.issues
        })
    };

    // TODO reduce TTK
    const verifyJWE = await mintJWE(await mintJWS(formData.data, "verify", "24h"))
    const verifyLink = `${process.env.ROOT_API_URL}/${process.env.STAGE}/register/verify?token=${verifyJWE}`

    return mailTransport.sendMail({
        from: process.env.IDENTITY_EMAIL,
        to: formData.data.email,
        subject: "DSIRE API: Verify your email to continue",
        html: verifyTemplate(formData.data.email, verifyLink)
    }).then(info => ({
        headers: RESPONSE_HEADERS,
        statusCode: 200,
        body: JSON.stringify({
            code: 200,
            message: "OK"
        })
    })).catch(error => ({
        headers: RESPONSE_HEADERS,
        statusCode: 500,
        body: JSON.stringify({
            code: 500,
            message: `Failed to send verification email to ${formData.data.email}`
        })
    }));
}
