async function submitForm(){
    let username = document.forms["signupform"]["username"].value;
    let email = document.forms["signuptform"]["email"].value;
    let org = document.forms["signupform"]["email"].value;
    console.log(username);
    const response = await fetch('https://jte4x8sz31.execute-api.us-east-1.amazonaws.com/testingStage',{
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            org: org,
        })
    })
}