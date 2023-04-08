import HTML from "./html.mjs"


export default (accessToken: string, revocationLink: string): string => HTML`
<!DOCTYPE html>
<html>
	<body>
        <p>
            Hello from the folks at DSIRE! You're approved for API access. Your
            key is:
        </p>
        <code>${accessToken}</code>
        <p>
		<p>
            Keep your key secret! Should you need to revoke it, click
            <a href="${revocationLink}">here</a> at any time. We recommend
            archiving this email, just in case.
        <p>
        <p>
            If it's your first time, or if you'd like to see the API in action:<br>
		    Standard <a href="https://www.google.com/">API documentation</a> is available.<br>
            Interactive <a href="https://www.google.com/">API demos</a> are available.
        </p>
        <p>
            Thanks again for your interest in DSIRE!<br>
            —the API team
        </p>
	</body>
</html>
`
