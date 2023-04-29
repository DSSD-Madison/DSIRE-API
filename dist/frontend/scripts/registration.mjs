window.submit = async function submit(v3Token) {

    const formData = {};
    ["name", "email", "org"].forEach(field => {
        const element = document.getElementById(`form-${field}`);
        element.className = ""
        formData[field] = element.value;
    });

    const statusHeader = document.getElementById("status-header");
    const statusMessage = document.getElementById("status-message");
    const loader = document.getElementById("loader");

    statusHeader.innerHTML = "Processing"
    statusHeader.className = ""
    statusMessage.innerHTML = ""
    loader.style.display = "initial"

    document.getElementById("sash").classList.add("reveal-status");

    const response = await fetch(`${document.getElementById("API_URL").innerText}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(formData),
    })
    const body = await response.json()
    console.log(body);

    switch (response.status) {
        case 200:
            statusHeader.innerHTML = "Success!";
            statusHeader.className = "OK";
            statusMessage.innerHTML = "Please check your inbox.";
            loader.style.display = "none";
            break;
        case 400:
            statusHeader.innerHTML = "Please try again";
            statusHeader.className = "error";
            let errorMessage = "";
            body.message.forEach(error => {
                errorMessage += (error.message + ".<br>");
                document.getElementById(`form-${error.path[0]}`).classList.add("error");
            })
            statusMessage.innerHTML = errorMessage;
            loader.style.display = "none";
            break;
        case 500:
            statusHeader.innerHTML = "Server error";
            statusHeader.className = "error";
            statusMessage.innerHTML = body.message + '.';
            loader.style.display = "none";
            break;
    }
}
