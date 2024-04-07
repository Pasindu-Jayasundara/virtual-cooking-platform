function register() {
  var name = document.getElementById("reg_name").value;
  var email = document.getElementById("reg_uname").value;
  var password = document.getElementById("reg_pass").value;
  var re_password = document.getElementById("reg_re_pass").value;

  if (name.trim() == "") {
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
        // purchased_tutorials: null,
        purchased_tutorials: {
          "1": {
            name: "How to make a cake",
            related_to: "American Cuisine",
            chef_name: "Chef A"
          },
          "2": {
            name: "How to make a Bun",
            related_to: "Australian Cuisine",
            chef_name: "Chef A"
          },
          "3": {
            name: "How to make a cake",
            related_to: "Sri Lankan Cuisine",
            chef_name: "Chef A"
          }
        },
        // payment_history: null,
        payment_history: {
          "1": {
            name: "How to make a cake",
            chef_name: "Chef A",
            purchased_date: "2021-09-01",
            paid_amount: "1000.00"
          },
          "2": {
            name: "How to make a cake",
            chef_name: "Chef A",
            purchased_date: "2021-09-01",
            paid_amount: "1000.00"
          },
          "3": {
            name: "How to make a cake",
            chef_name: "Chef A",
            purchased_date: "2021-09-01",
            paid_amount: "1000.00"
          }
        },
        // recently_accessed: null,
        recently_accessed: {
          "1": {
            name: "How to make a cake",
            related_to: "American Cuisine",
            chef_name: "Chef A"
          },
          "2": {
            name: "How to make a Bun",
            related_to: "Australian Cuisine",
            chef_name: "Chef A"
          },
          "3": {
            name: "How to make a cake",
            related_to: "Sri Lankan Cuisine",
            chef_name: "Chef A"
          }
        },
        isChef: false,
        // my_tutorials: null
        my_tutorials: [
          {
            id: 1,
            name: "How to make a cake",
            price: "1000.00",
            related_to: "American Cuisine",
            description: "This is a tutorial on how to make a cake",
            chef_name: "Chef A"
          },
          {
            id: 2,
            name: "How to make a Bun",
            price: "1000.00",
            related_to: "Australian Cuisine",
            description: "This is a tutorial on how to make a Bun",
            chef_name: "Chef A"
          },
          {
            id: 3,
            name: "How to make a cake",
            price: "1000.00",
            related_to: "Sri Lankan Cuisine",
            description: "This is a tutorial on how to make a cake",
            chef_name: "Chef A"
          }
        ]
      };

      users[email] = user;
      localStorage.setItem("users", JSON.stringify(users));

      if (JSON.parse(localStorage.getItem("users"))[email] == null) {
        alert("Registration failed. Please try again");
      } else {
        alert("Registration successful");
        window.location.href = "login.html";
      }
    }
  }
}
