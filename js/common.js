window.addEventListener("load", function() {

    var pageUrl = window.location.href.split("/").pop();
    if(pageUrl!=undefined && pageUrl == "user_profile.html" || pageUrl == "chef_profile.html") {
        if(isLoggedIn()) {
            this.document.getElementsByTagName("body")[0].style.display = "block";

            if(pageUrl == "user_profile.html") {
                this.document.getElementById("user_profile-name").innerHTML =  JSON.parse(localStorage.getItem("logedInUser")).name;
            }
        }else{
            window.location.href = "login.html";
        }
    }

});


function setLogedInUser(user) {
    localStorage.setItem("logedInUser", JSON.stringify(user));
}

function isLoggedIn() {
    return localStorage.getItem("logedInUser") != null;
}

function validateEmail(email) {
    
    var validEmailFormat = /^[^+@]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
    return validEmailFormat.test(email);
}

function validatePassword(password) {
    
    var validPasswordFormat = /^[a-zA-Z0-9]{8,}$/;
    return validPasswordFormat.test(password);
}

function isUsersAvaliable() {
    
    if(localStorage.getItem("users") == null) {
        return false;
    }
    return true;
}