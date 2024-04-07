function login(){

    var email = document.getElementById("login_uname").value;
    var password = document.getElementById("login_pass").value;

    if(email.trim()=="" && !validateEmail(email)){
        alert("Invalid email format");
    }else if(password.trim()=="" && !validatePassword(password)){
        alert("Invalid password format");
    }else{

        if(!isUsersAvaliable()){
            alert("Please registered first");
        }else{
            var users = JSON.parse(localStorage.getItem("users"));
            if(users[email] == null){
                alert("You are not registered. Please register to continue");
            }else{
                var user = users[email];
                if(user.username == email && user.password == password){
                    setLogedInUser(user);
                    alert("Login successful");
                    window.location.href = "user_profile.html";
                }else{
                    alert("Invalid username or password");
                }
            }
        }

    }

}