export default (token) => {`
	<html>
		<body>
			<style>
				p {style="font-family:arial"}
				a {style="font-family:arial"}
			</style>
			<p>You've been approved for API access! Here's your key:<br><br></p>
			<p style="font-family:consolas;font-size:14px">${token}<br><br></p>
			<p>Keep your key secret! Should you need to revoke it, click <a href="dsireusa.org/lols?token=${token}">here</a>.<br></p>
			<p>Documentation for the API is available <a href="https://dsireusa.org/docs">here</a>.<br></p>
			<p>Interactive API demos are available <a href="https://dsireusa.org/docs/demo">here</a>.</p>
		</body>
	</html>
`}
