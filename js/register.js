function register() {
  var name = document.getElementById("reg_name").value;
  var email = document.getElementById("reg_uname").value;
  var password = document.getElementById("reg_pass").value;
  var re_password = document.getElementById("reg_re_pass").value;

  if (name.trim() != "") {
    alert("Please enter your name");
  } else if (email.trim() == "" && !validateEmail(email)) {
    alert("Invalid email format. Please enter a valid email address");
  } else if (password.trim() == "" && !validatePassword(password)) {
    alert("Invalid password format");
  } else if (re_password.trim() == "" && password != re_password) {
    alert("Passwords do not match");
  } else {
    if (!isUsersAvaliable()) {
      // no registered users before
      var users = {};
    } else {
      // have already registered users
      var users = JSON.parse(localStorage.getItem("users"));
    }

    if (users[email] != null) {
      alert("You have already registered. Please login to continue");
    } else {

      // new registration
      var user = {
        name: name,
        username: email,
        password: password,
      };

      users[email] = JSON.stringify(user);

      if (localStorage.getItem("users")[email] == null) {
        alert("Registration failed. Please try again");
      } else {
        alert("Registration successful");
        window.location.href = "login.html";
      }
    }
  }
}
