var showSmallMenu = false;

function smallMenu() {
  if (showSmallMenu) {
    document.getElementById("small-menu").style.display = "none";
    document.getElementById("menu-icon-close").style.display = "none";
    document.getElementById("menu-icon").style.display = "flex";
    showSmallMenu = false;
  } else {
    document.getElementById("small-menu").style.display = "flex";
    document.getElementById("menu-icon-close").style.display = "flex";
    document.getElementById("menu-icon").style.display = "none";
    showSmallMenu = true;
  }
}
function myAccount(){
  if(localStorage.getItem("logedInUser")==null){
    window.location.href = "login.html";
  }else{
    window.location.href = "user_profile.html";
  }
}