const message = new URLSearchParams(window.location.search).get("message");

const statusHeader = document.getElementById("status-header")
const statusMessage = document.getElementById("status-message")

switch (message) {
    case "verified":
        document.title = "Email Verified—DSIRE";
        statusHeader.innerHTML = "Verified!";
        statusMessage.innerHTML = "Your request is pending approval.";
        break;
    case "approved":
        document.title = "User Approved—DSIRE";
        statusHeader.innerHTML = "User approved!";
        statusMessage.innerHTML = "They've received their credentials via email.";
        break;
}

setTimeout(() => document.getElementById("sash").classList.add("reveal-status"), 1500);
