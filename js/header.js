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
