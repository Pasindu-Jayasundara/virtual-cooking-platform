function login(){

    var email = document.getElementById("login_uname").value;
    var password = document.getElementById("login_pass").value;

    if(email.trim()=="" && !validateEmail(email)){
        alert("Invalid email format");
    }else if(password.trim()=="" && !validatePassword(password)){
        alert("Invalid password format");
    }else{

        if(!isUsersAvaliable()){
            alert("No registered users");
        }else{
            var users = localStorage.getItem("users");
            if(users[email] == null){
                alert("You are not registered. Please register to continue");
            }else{
                var user = JSON.parse(users[email]);
                if(user.username == email && user.password == password){
                    alert("Login successful");
                    window.location.href = "user_profile.html";
                }else{
                    alert("Invalid username or password");
                }
            }
        }

    }


}