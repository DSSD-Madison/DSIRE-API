import {createTransport} from "nodemailer"


export default createTransport({
    host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
    port: 587,
    secure: false, //Use STARTTLS on 587
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})
