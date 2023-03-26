var name_invalid = false;
var email_invalid = false;
var org_invalid = false;

async function register(form_data){
    response = fetch("https://dogvcluxdi.execute-api.us-east-1.amazonaws.com/testing/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "content-type": "text/plain",
        },
        body: JSON.stringify(form_data),
    }).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        if(json.code == 200){
            const message_element = document.createElement("p");
            message_element.innerHTML = "A message has been sent to your email address for verification.";
            message_element.id = "response-message";
            message_element.style.color = "green";
            message_element.style.fontWeight = "bold";
            form = document.getElementById("registrationform");
            form.appendChild(message_element);
        }
        else if(json.code == 422){
            const message_element = document.createElement("p");
            let name_message = json.messages.name;
            let email_message = json.messages.email;
            let org_message = json.messages.org;
            if(name_message!=null){
                name_input = document.getElementById("username");
                name_input.style.borderColor = "red";
                const message_element = document.createElement("p");
                message_element.id = "name-response-message";
                message_element.style.color = "red";
                message_element.style.fontWeight = "bold";
                message_element.innerHTML = name_message;
                form = document.getElementById("registrationform");
                form.appendChild(message_element);
                name_invalid = true;
            }
            if(email_message!=null){
                email_input = document.getElementById("email");
                email_input.style.borderColor = "red";
                const message_element = document.createElement("p");
                message_element.id = "email-response-message";
                message_element.style.color = "red";
                message_element.style.fontWeight = "bold";
                message_element.innerHTML = email_message;
                form = document.getElementById("registrationform");
                form.appendChild(message_element);
                email_invalid = true;
            }
            if(org_message!=null){
                org_input = document.getElementById("org");
                org_input.style.borderColor = "red";
                const message_element = document.createElement("p");
                message_element.id = "org-response-message";
                message_element.style.color = "red";
                message_element.style.fontWeight = "bold";
                message_element.innerHTML = org_message;
                form = document.getElementById("registrationform");
                form.appendChild(message_element);
                org_invalid = true;
            }
        }
        else{
            const message_element = document.createElement("p");
            message_element.innerHTML = json.message.split(":")[0];
            message_element.id = "response-message";
            message_element.style.color = "red";
            message_element.style.fontWeight = "bold";
            form = document.getElementById("registrationform");
            form.appendChild(message_element);
        }
    });
}

document.getElementById("submitbutton").addEventListener("click", e => {
  e.preventDefault();
  const message = document.getElementById("response-message");
  if(message!=null) message.remove();
    if(name_invalid){
        const name_message = document.getElementById("name-response-message");
        name_message.remove();
        const name_input = document.getElementById("username");
        name_input.style.borderColor = "#ccc";
        name_invalid = false;
    }
    if(email_invalid){
        const email_message = document.getElementById("email-response-message");
        email_message.remove();
        const email_input = document.getElementById("email");
        email_input.style.borderColor = "#ccc";
        email_invalid = false;
    }
    if(org_invalid){
        const org_message = document.getElementById("org-response-message");
        org_message.remove();
        const org_input = document.getElementById("org");
        org_input.style.borderColor = "#ccc";
        org_invalid = false;
    }
  var name = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var org = document.getElementById("org").value;
  let data = {name:`${name}`, email:`${email}`, org:`${org}`};
  register(data);
});