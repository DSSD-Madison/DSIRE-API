export default (token) => {`
	<html>
		<div id="button" style="width:20px; height:20px"></div>
		<body>					
			<p style="font-family:arial">Click here to verify your email for the DSIRE API.</p>
			<button style="border-radius:4px; border: 3px solid #c00" onclick="redirectTo(this)" value="https://www.dsireusa.org/register/verify?token=${token}">Verify email</button> <br>						
			<script>
			function redirectTo(link) { 
				console.log(link);
				location.href = link.value;
			}
			</script>
			<p style="font-family:arial">If you didn't make this request, please ignore this email; no further action is required.<p>
		</body>
	</html>
`}
