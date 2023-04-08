import HTML from "./html.mjs"


export default (email: string, verifyLink: string): string => HTML`
<!DOCTYPE html>
<html>
	<body>
        <p>
            Hello from the DSIRE API!<br>
            We received a request from your email addess (${email}) to begin the
            registration process. To confirm this request, click
            <a href="${verifyLink}">here</a> in the next 30 minutes. If you did not initiate
            this request, please disregard this email—no further action is
            required.
        </p>
        <p>
            Thanks for your interest in DSIRE!<br>
            —the API team
        </p>
	</body>
</html>
`
