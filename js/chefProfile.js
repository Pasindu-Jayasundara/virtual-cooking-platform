var logedInUser = null;
var chefId = null;
var chefArr=null;

window.addEventListener("load", function () {

  var pageUrl = window.location.href.split("/").pop();
  if(pageUrl.split("?").length > 1) {
      
      pageUrl = pageUrl.split("?")[1];
      chefId = pageUrl.split("=")[1];
  }

  if (logedInUser == null) {
    logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
  }

  if(chefId != null) {

    chefArr = JSON.parse(localStorage.getItem("chefs"));
    document.getElementsByTagName("body")[0].style.display = "block";
    document.getElementById("new_tu_btn").style.display = "none";

    loadChefDetails(chefId);
    loadChefTutorials(chefId);
  }
  // loadMyTutorials();
});

// function showNewTutorialForm() {
//   if (document.getElementById("newTutorialForm").style.display == "block") {
//     document.getElementById("newTutorialForm").style.display = "none";

//     document.getElementById("cp_tutorial_name").value = "";
//     document.getElementById("cp_tutorial_price").value = "";
//     document.getElementById("cp_tutorial_relate_to").value = "";
//     document.getElementById("cp_tutorial_desc").value = "";
//   } else {
//     document.getElementById("newTutorialForm").style.display = "block";
//   }
// }

// function addNewTutorial() {
//   var tutorial_name = document.getElementById("cp_tutorial_name").value;
//   var tutorial_price = document.getElementById("cp_tutorial_price").value;
//   var tutorial_relate_to = document.getElementById("cp_tutorial_relate_to").value;
//   var tutorial_desc = document.getElementById("cp_tutorial_desc").value;

//   if (tutorial_name.trim() == "") {
//     alert("Please enter tutorial name");
//   } else if (tutorial_price.trim() == "" && isNaN(tutorial_price)) {
//     alert("Invalid tutorial price");
//   } else if (tutorial_relate_to.trim() == "") {
//     alert("Please enter tutorial relate to");
//   } else if (tutorial_desc.trim() == "") {
//     alert("Please enter tutorial description");
//   } else {
//     if (logedInUser.my_tutorials == null) {
//       var tutorials = [];
//     } else {
//       var tutorials = logedInUser.my_tutorials;
//     }

//     var newTutorial = {
//       name: tutorial_name,
//       price: tutorial_price,
//       relate_to: tutorial_relate_to,
//       description: tutorial_desc,
//       chef_name: logedInUser.name,
//     };

//     console.log(newTutorial);

//     tutorials[tutorials.length] = newTutorial;
//     logedInUser.my_tutorials = tutorials;

//     localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

//     var currentUsersObject = JSON.parse(localStorage.getItem("users"));
//     currentUsersObject[logedInUser.username] = logedInUser;

//     localStorage.setItem("users",JSON.stringify(currentUsersObject));

//     alert("Tutorial added successfully");
//     loadMyTutorials();
//   }
// }

// function loadMyTutorials() {
//   var myTutorialArr = logedInUser.my_tutorials;

//   if (myTutorialArr != null) {
//     var myTutorialCardList = "";

//     for (var id in myTutorialArr) {

//       var card = myTutorialArr[id];
//       var myTutorialCard = `
//               <div class="search-card">
//                   <div class="search-card-head"></div>
//                   <div class="search-card-body">
  
//                       <div class="search-card-body-first">
  
//                           <div class="search-card-body-second">
//                               <div class="search-card-name">${card.name}</div>
//                               <div class="search-card-city">${card.related_to}</div>
//                           </div>
  
//                       </div>
  
//                       <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>
  
//                   </div>
//               </div>
//           `;
//       myTutorialCardList += myTutorialCard;
//     }

//     document.getElementById("cpTutorialDiv").innerHTML = myTutorialCardList;
//   }
// }

function loadChefDetails(id) {
  var chefArr = JSON.parse(localStorage.getItem("chefs"));
  var chef = chefArr[id - 1];

  document.getElementById("cpChefName").innerHTML = chef.name;
  document.getElementById("cpChefDesc").innerHTML = chef.desc;
  document.getElementById("cpChefImage").style.backgroundImage = "url(" + chef.image + ")";

}

function loadChefTutorials(id){

  var chefTutorialArr = [];

  var tutorialArr = JSON.parse(localStorage.getItem("tutorials"));
  tutorialArr.forEach(obj => {

    if(obj.chefId == id){
      chefTutorialArr.push(obj);
    }

  });

  if (chefTutorialArr != null) {
    var chefTutorialCardList = "";

    for (var cardId in chefTutorialArr) {

      var card = chefTutorialArr[cardId];
      var chefTutorialCard = `
              <div class="search-card" onclick="goToTutorial(${card.id});">
                  <div class="search-card-head" style="background-image:url(${card.image.replace("..","/uor_web_sem1_gpp")});"></div>
                  <div class="search-card-body">
  
                      <div class="search-card-body-first">
  
                          <div class="search-card-body-second">
                              <div class="search-card-name">${card.name}</div>
                              <div class="search-card-city">${card.related_to}</div>
                          </div>
  
                      </div>
  
                      <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>
  
                  </div>
              </div>
          `;
          chefTutorialCardList += chefTutorialCard;
    }

    document.getElementById("cpTutorialDiv").innerHTML = chefTutorialCardList;
  }

}
function goToTutorial(tutorialId){
  window.location.href = "lesson.html?tutorialId="+tutorialId;
}