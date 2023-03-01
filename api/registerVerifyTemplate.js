export default (token) => {
	var jwt = require('jsonwebtoken');
	var decoded = jwt.decode("secret", token);
	return `
	<html>
		<body>
			<style>
				p {"font-family:arial"}
				a {"font-family:arial"}
			</style>					
			<p>The following user is requesting access and has verified their email:</p>
			<p>Name: ${decoded.name} <br>Email: ${decoded.email} <br>Organization: ${decoded.organization}<br></p>
			<p>To approve this user, click <a href="https://dsireusa.org/register/approve?token=${token}">here</a> within the next 24 hours. To deny this request, no further action is required.</p>
		</body>
	</html>
`}
