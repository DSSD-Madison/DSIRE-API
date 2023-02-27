export default (token) => `
<!DOCTYPE html>
<html>
	<body>
		Click here to verify your email for the DSIRE API.
		<button onclick=redirectTo(this) value="https://dsireusa.org/register/verify?token=${token}">Verify email</button>
		<script>
		const redirectTo(link) {
			location.href(link.value);
		}
		</script>
		If you did not make this request, please ignore this email. No further action is required.
		
		Thanks for your interest in DSIRE!
	</body>
</html>			
`	
