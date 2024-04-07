window.addEventListener("load", function() {
    loadMyTutorials();
});

function showNewTutorialForm(){
    if(document.getElementById('newTutorialForm').style.display == 'block'){
        document.getElementById('newTutorialForm').style.display = 'none';

        document.getElementById('cp_tutorial_name').value = '';
        document.getElementById('cp_tutorial_price').value = '';
        document.getElementById('cp_tutorial_relate_to').value = '';
        document.getElementById('cp_tutorial_desc').value = '';
    }
    else{
        document.getElementById('newTutorialForm').style.display = 'block';
    }
}

function addNewTutorial(){
    var tutorial_name = document.getElementById('cp_tutorial_name').value;
    var tutorial_price = document.getElementById('cp_tutorial_price').value;
    var tutorial_relate_to = document.getElementById('cp_tutorial_relate_to').value;
    var tutorial_desc = document.getElementById('cp_tutorial_desc').value;

    if(tutorial_name.trim() == ''){
        alert('Please enter tutorial name');
    }else if(tutorial_price.trim() == '' && isNaN(tutorial_price)){
        alert('Invalid tutorial price');
    }else if(tutorial_relate_to.trim() == ''){
        alert('Please enter tutorial relate to');
    }else if(tutorial_desc.trim() == ''){
        alert('Please enter tutorial description');
    }else{
        
        if(logedInUser.my_tutorials == null){
            var tutorials = [];
        }else{
            var tutorials = logedInUser.my_tutorials;
        }

        var newTutorial = {
            name: tutorial_name,
            price: tutorial_price,
            relate_to: tutorial_relate_to,
            description: tutorial_desc,
            chefName: logedInUser.name
        };

        tutorials[tutorials.length] = newTutorial;
        logedInUser.my_tutorials = tutorials;

        localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

        alert('Tutorial added successfully');
        loadMyTutorials();
    }
}

function loadMyTutorials(){

    var myTutorialArr = logedInUser.my_tutorials;
    if (myTutorialArr != null) {
  
      var myTutorialCardList = "";
  
      for(var card in myTutorialArr){
  
          var myTutorialCard = `
              <div class="search-card">
                  <div class="search-card-head"></div>
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
          myTutorialCardList += myTutorialCard;
      }
  
      document.getElementById("cpTutorialDiv").innerHTML = myTutorialCardList;
  
    }

}