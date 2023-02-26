import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda"
import {createTransport} from "nodemailer"

const mailTransport = createTransport({
    host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
    port: 587,
    secure: false, //Use STARTTLS on 587
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})

const generateVerifyMessageBody = (name: string, email: string, org?: string) => `
Hello from the DSIRE API!

We received a request from your email address (${email}) to begin the
registration process. To confirm this request, please click here:

name: ${name}
email: ${email}
org: ${org}

in the next 30 minutes. If you did not initiate this request, please disregard
this email--no further action is required.

Thanks for your interest in DSIRE!
--the API team
`


export default async function register(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {

    const userForm = new URLSearchParams(event.body)

    try {
        const result = await mailTransport.sendMail({
            from: process.env.IDENTITY_EMAIL,
            to: userForm.get("email"),
            subject: "DSIRE API: Verify your email to continue",
            text: generateVerifyMessageBody(userForm.get("name"), userForm.get("email"), userForm.get("org"))
        })
        return {
            statusCode: 200,
            body: "OK"
        }
    }
    catch (e) {
        return {
            statusCode: 400,
            body: `Failed: ${e}`
        }
    }
}
