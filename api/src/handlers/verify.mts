import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"

import approveTemplate from "../email-templates/approve.mjs"
import mailTransport from "../mailTransport.mjs"
import {checkJWS, decryptJWE, mintJWE, mintJWS} from "../crypto.mjs"

export default async function verify(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    // TODO if token doesn't exist
    const userData = await checkJWS(await decryptJWE(event?.queryStringParameters?.token || ""), "verify")

    // TODO TTK?
    const approveJWE = await mintJWE(await mintJWS({email: userData.email}, "approve", "72h"))
    const approveLink = `${process.env.ROOT_API_URL}/${process.env.STAGE}/register/approve?token=${approveJWE}`

    // TODO if this fails?
    await mailTransport.sendMail({
        from: process.env.IDENTITY_EMAIL,
        to: process.env.APPROVER_EMAIL,
        subject: "DSIRE API: A user is pending approval",
        //@ts-ignore TODO check that JWTPayload actually had data
        html: approveTemplate(userData.name, userData.email, userData.org, approveLink)
    })

    return {
        headers: {
            // TODO static URL
            "Location": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com/notify.html?message=verified`
        },
        statusCode: 303,
        body: ""
    }
}
