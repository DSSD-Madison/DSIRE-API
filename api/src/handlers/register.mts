import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"

import mailTransport from "../mailTransport.mjs"
import {mintJWE, mintJWS} from "../crypto.mjs"
import verifyTemplate from "../email-templates/verify.mjs"


export default async function register(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    // Real requests come in as strings, the console tester injects an object; handle both
    const formData: {
        name: string
        email: string
        org: string
    } = typeof(event.body) === "string" ? JSON.parse(event.body) : event.body

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
            "content-type": "application/json"
        },
        statusCode: 200,
        body: JSON.stringify({
            code: 200,
            message: "OK"
        })
    })).catch(error => ({
        headers: {
            "content-type": "application/json"
        },
        statusCode: 400,
        body: JSON.stringify({
            code: 400,
            message: `Failed to send approval email to user ${formData.name}: ${error}`
        })
    }));
}
