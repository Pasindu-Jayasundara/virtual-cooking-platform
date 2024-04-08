function sendEmail() {
  var cname = document.getElementById("cu_name").value;
  var city = document.getElementById("cu_city").value;
  var email = document.getElementById("cu_email").value;
  var message = document.getElementById("cu_message").value;

  if (
    cname.trim() == "" ||
    city.trim() == "" ||
    email.trim() == "" ||
    message.trim() == ""
  ) {
    alert("Please Fill All the Fields");
  } else if (!validateEmail(email)) {
    alert("Enter a valid Email");
  } else {
    var message =
      "Name: " +
      cname +
      "\nCity: " +
      city +
      "\nEmail: " +
      email +
      "\nMessage: " +
      message;
    document
      .getElementById("sendEmailA")
      .setAttribute(
        "href",
        "mailto:cookhubeducation@gmail.com?subject=" +
          cname +
          "&body=" +
          message +
          " "
      );
    document.getElementById("sendEmailA").click();
  }
}
