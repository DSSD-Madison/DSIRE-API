import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"

import accessTemplate from "../email-templates/access"
import mailTransport from "../mailTransport"
import {checkJWS, decryptJWE, mintJWE, mintJWS} from "../crypto"

export default async function approve(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    const email = (await checkJWS(await decryptJWE(event.queryStringParameters.token), "approve")).email

    // TODO TTK?
    const accessJWS = await mintJWS({accessLevel: 1}, "access", "364d")

    // TODO if this fails?
    await mailTransport.sendMail({
        from: process.env.IDENTITY_EMAIL,
        //@ts-ignore TODO check that JWTPayload actually had data
        to: email,
        subject: "DSIRE API: access confirmed!",
        //@ts-ignore TODO check that JWTPayload actually had data
        html: accessTemplate(accessJWS, "https://www.google.com/")
    })

    return {
        headers: {
            // TODO static URL
            "Location": `https://dsire-api-hosting-${process.env.STAGE}.s3.amazonaws.com/postApprove.html`
        },
        statusCode: 303,
        body: null
    }
}
