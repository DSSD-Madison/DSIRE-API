export default (name: string, email: string, org: string, approveLink: string): string => `
<!DOCTYPE html>
<html>
	<body>
        <p>
            Hello from the DSIRE API!<br>
            A new user has confirmed their email for API access:<br>
            Name: <code>${name}</code><br>
            Email: <code>${email}</code><br>
            Organization: <code>${org}</code><br>
            To approve this user, please click <a href="${approveLink}">here</a>
            within 72 hours. To deny approval for this user, no further action
            is required.
        </p>
        <p>
            Thanks for working with DSSD!<br>
            —the API team
        </p>
	</body>
</html>
`
