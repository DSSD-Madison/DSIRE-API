//import { Validator, enLang as en } from '@upjs/facile-validator';/

function register(form_data){
    fetch("https://dogvcluxdi.execute-api.us-east-1.amazonaws.com/testing/register", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
        })
}

/*const v = new Validator(form, {
    lang: en,
});*/

document.getElementById("submitbutton").addEventListener("click", e => {
  e.preventDefault();
  var name = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var org = document.getElementById("org").value;
  let data = {name:`${name}`, email:`${email}`, org:`${org}`};
  register(data);
  //v.validate();
});

/*v.on('validation:success', () => {
    alert('Nice! The form was validated without any errors');
    var name = document.forms["registrationform"]["name"].value;
    var email = document.forms["registrationform"]["email"].value;
    var org = document.forms["registrationform"]["org"].value;
    let data = {name:`${name}`, email:`${email}`, org:`${org}`};
    register(data);
});

v.on('validation:failed', () => {
    alert('Oops! There are some errors in the form.');
});*/