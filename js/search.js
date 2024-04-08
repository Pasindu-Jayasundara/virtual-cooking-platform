window.addEventListener("load", function() {
    loadLessons();
});


var lessonArr = JSON.parse(localStorage.getItem("tutorials"));

var searchInput = document.getElementById("search_search_input");
searchInput.addEventListener("keyup", function() {
    var searchValue = searchInput.value.toLowerCase();
    if(searchValue == "") {
        tutorialArr = lessonArr;
        loadChefs();
        return;
    }
    var filteredTutorials = tutorialArr.filter(function(tutorial) {
        return tutorial.name.toLowerCase().includes(searchValue);
    });
    tutorialArr = filteredTutorials;
    loadSearchLessons();
});

function loadSearchLessons() {  

    if (tutorialArr != null) {
      var searchCardList = "";
  
        for (var i = tutorialArr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = tutorialArr[i];
            tutorialArr[i] = tutorialArr[j];
            tutorialArr[j] = temp;
        }

        for (var id in tutorialArr) {
    
            var card = tutorialArr[id];
            var searchCard = `
                <div class="search-card">
                    <div class="search-card-head" style="background-image:url(${card.image});" onclick="goto_lesson(${card.id});"></div>
                    <div class="search-card-body">

                        <div class="search-card-body-first">

                            <div class="search-card-body-second">
                                <div class="search-card-name">${card.name}</div>
                                <div class="search-card-city">${card.related_to}</div>
                            </div>

                            <div class="search-card-price">$ ${card.price}</div>

                        </div>

                        <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>

                        <div class="search-card-footer">
                            <div class="search-card-cart" onclick="addtoCart(${card.id});">Add to Cart</div>
                            <div class="search-card-buy" onclick="buyNow(${card.price},'${card.name}',${card.id},'${card.related_to}','${card.chef_name}');" id="payhere-payment">Buy Now</div>
                        </div>

                    </div>
                </div>
            `;
            searchCardList += searchCard;
        }
  
        document.getElementById("search_display_div").innerHTML = searchCardList;
    }
}

function goto_lesson(id) {
  window.location.href = "lesson.html?tutorialId="+id;
}

function addtoCart(lessonid){

    var currentCartArray = JSON.parse(localStorage.getItem("cart"));

    var incart = false;

    if (currentCartArray != null) {
        for(var i = 0; i < currentCartArray.length; i++){
            if(currentCartArray[i].lessonId == lessonid){
                incart = true;
                break;
            }
        }
    }

    if(incart){
        alert("Item Already in Cart!");
        return;
    }
    var newCartObj = {
        id: currentCartArray.length,
        lessonId: lessonid,
    };

    currentCartArray.push(newCartObj);
    localStorage.setItem("cart", JSON.stringify(currentCartArray));

    alert("Item Added to Cart!");

}

function buyNow(lessonPrice,itemName,lesson_Id,related_To,chef_Name){
    if(isLoggedIn()) {
        
        var logedinUser = JSON.parse(localStorage.getItem("logedInUser"));

        var paymentObject = {
            price: lessonPrice,
            items: itemName,
            logedinUserName: logedinUser.name,
            logedinUserEmail: logedinUser.username,
            lessonId:lesson_Id,
            relatedTo:related_To,
            chefName:chef_Name,
        };

        pay(paymentObject);

    }else{
        alert("Please Login First!");
        window.location.href = "login.html";
    }
}

function loadLessons(){

    var tutorialArray = JSON.parse(localStorage.getItem("tutorials"));

    if (tutorialArray != null) {
      var searchCardList = "";
  
        for (var i = tutorialArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = tutorialArray[i];
            tutorialArray[i] = tutorialArray[j];
            tutorialArray[j] = temp;
        }

        for (var id in tutorialArray) {
    
            var card = tutorialArray[id];
            var searchCard = `
                <div class="search-card">
                    <div class="search-card-head" style="background-image:url(${card.image});" onclick="goto_lesson(${card.id});"></div>
                    <div class="search-card-body">

                        <div class="search-card-body-first">

                            <div class="search-card-body-second">
                                <div class="search-card-name">${card.name}</div>
                                <div class="search-card-city">${card.related_to}</div>
                            </div>

                            <div class="search-card-price">$ ${card.price}</div>

                        </div>

                        <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>

                        <div class="search-card-footer">
                            <div class="search-card-cart" onclick="addtoCart(${card.id});">Add to Cart</div>
                            <div class="search-card-buy" onclick="buyNow(${card.price},'${card.name}',${card.id},'${card.related_to}','${card.chef_name}');" id="payhere-payment">Buy Now</div>
                        </div>

                    </div>
                </div>
            `;
            searchCardList += searchCard;
        }
  
        document.getElementById("search_display_div").innerHTML = searchCardList;
    }
}