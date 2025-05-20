var chefArr = null;
window.addEventListener("load", function () {

    if(chefArr == null) {
        chefArr = JSON.parse(localStorage.getItem("chefs"));
    }

    loadChefs();

});

function loadChefs() {  

    if (chefArray != null) {
      var chefCardList = "";
  
        for (var i = chefArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = chefArray[i];
            chefArray[i] = chefArray[j];
            chefArray[j] = temp;
        }

        for (var id in chefArray) {
    
            var card = chefArray[id];
            var chefCard = `
                <div class="chef-card" onclick="gotoChefProfile(${card.id});">
    
                    <div class="chef-card-header" style="background-image: url(${card.image.replace("..","/virtual-cooking-platform")});"></div>

                    <div class="chef-card-body">
                        <div class="chef-tutorial-wrap">

                            <div class="chef-name-town-container">
                                <div class="chef-name">${card.name}</div>
                                <div class="chef-town">${card.town}</div>
                            </div>
                            <div class="chef-tutorial-count">${card.numberOfTutorials} Tutorials</div>

                        </div>

                        <div class="chef-experience">${card.experience} Years Experience</div>
                        <div class="chef-desc">
                            ${card.desc}
                        </div>
                    </div>
                </div>
            `;
            chefCardList += chefCard;
        }
  
        document.getElementById("chefDiv").innerHTML = chefCardList;
    }
}

var searchInput = document.getElementById("chef_search_input");
searchInput.addEventListener("keyup", function() {
    var searchValue = searchInput.value.toLowerCase();
    if(searchValue == "") {
        chefArray = chefArr;
        loadChefs();
        return;
    }
    var filteredChefs = chefArray.filter(function(chef) {
        return chef.name.toLowerCase().includes(searchValue) || chef.town.toLowerCase().includes(searchValue);
    });
    chefArray = filteredChefs;
    loadChefs();
});


function gotoChefProfile(chefId) {
    window.location.href = "chef_profile.html?id=" + chefId;
}