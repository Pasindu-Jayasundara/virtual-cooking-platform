window.addEventListener('load', function() {
    loadTrending();
});
function loadTrending() {

        var trendingArray = JSON.parse(localStorage.getItem("trending"));
    
        if (trendingArray != null) {
          var trendingCardList = "";
      
            for (var i = trendingArray.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = trendingArray[i];
                trendingArray[i] = trendingArray[j];
                trendingArray[j] = temp;
            }
    
            for (var id in trendingArray) {
        
                var card = trendingArray[id];
                var trendingCard = `
                    <div class="search-card trending-search-card">
                        <div class="search-card-head" style="background-image:url(${card.image});" onclick="gotolesson(${card.id});">
                            <div class="trending-mark">Flash</div>
                        </div>
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
                                <div class="search-card-buy" onclick="buyNow(${card.price},'${card.name}');">Buy Now</div>
                            </div>

                        </div>
                    </div>
                `;
                trendingCardList += trendingCard;
            }
      
            document.getElementById("trendingDiv").innerHTML = trendingCardList;
        }
    
}



function buyNow(lessonPrice,itemName){
    if(isLoggedIn()) {
        
        var logedinUser = JSON.parse(localStorage.getItem("logedInUser"));

        var paymentObject = {
            price: lessonPrice,
            items: itemName,
            logedinUserName: logedinUser.name,
            logedinUserEmail: logedinUser.username,
        };

        pay(paymentObject);

    }else{
        alert("Please Login First!");
        window.location.href = "login.html";
    }
}

function addtoCart(lessonid){

    var currentCartArray = JSON.parse(localStorage.getItem("cart"));

    var newCartObj = {
        id: currentCartArray.length,
        lessonId: lessonid,
    };

    currentCartArray.push(newCartObj);
    localStorage.setItem("cart", JSON.stringify(currentCartArray));

    alert("Item Added to Cart!");

}
