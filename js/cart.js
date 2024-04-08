window.addEventListener("load", function() {
    loadCartCards();
});
function loadCartCards(){

    var cartArray = JSON.parse(localStorage.getItem("cart"));

    if (cartArray != null) {
      var cartCardList = "";

        for (var id in cartArray) {

            var lessonId = cartArray[id].lessonId;
            var lessonArray = JSON.parse(localStorage.getItem("tutorials"));

            var place = 0;
            lessonArray.forEach(element => {
                if(element.id == lessonId){
                    console.log(element.id);

                    var cartCard = `
                        <div class="cart-card">
                            <div class="cart-card-header" style="background-image:url(${element.image});" onclick="gotolesson(${element.id});"></div>
                            <div class="cart-card-body">
                                <div class="cart-cource-name-and-by">
                                    <div class="cart-card-title">${element.name}</div>
                                    <div class="cart-card-price">By ${element.chef_name}</div>
                                </div>
                                <div class="cart-card-quantity">$ ${element.price}</div>
                            </div>
                            <div class="cart-card-btn-container">
                                <div class="cart-remove-btn" onclick="removeFromCart(${place});">Remove</div>
                                <div class="cart-addto-checkout-btn" onclick="addtoCheckout('${element.name}',${element.price},${element.id},'${element.related_to}','${element.chef_name}');">Add</div>
                            </div>
                        </div>
                    `;
                    cartCardList += cartCard;
                }
                place++;

            });

        }
  
        document.getElementById("cartCardDiv").innerHTML = cartCardList;
    }
}

function gotolesson(id) {
    window.location.href = "lesson.html?tutorialId="+id;
}

function removeFromCart(place){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    cartArray.splice(place, 1);
    localStorage.setItem("cart", JSON.stringify(cartArray));
    loadCartCards();
}

var checkoutItemIds = [];
var checkoutItems = [];
var checkoutPrices = [];
var relatedTo = [];
var chefName = [];
var priceList = [];
var total = 0;

function addtoCheckout(name,price,id,related_to,chef_name){

    if(checkoutItemIds.includes(id)){
        alert("Item Already Added to Checkout!");
        return;
    }

    total += price;
    checkoutItems.push(name);
    checkoutPrices.push(price);
    checkoutItemIds.push(id);
    relatedTo.push(related_to);
    chefName.push(chef_name);
    priceList.push(price);

    var rowList="";
    for (var i = 0; i < checkoutItems.length; i++) {
        
        var row = `
            <div class="checkout-item-details">
                <div class="checkout-item-name">${checkoutItems[i]}</div>
                <div class="checkout-item-price">$ ${checkoutPrices[i]}</div>
            </div>
        `;
        rowList += row;
    }

    document.getElementById("chout").innerHTML = rowList;
    document.getElementById("total").innerHTML = total;

}

function cancleCheckout(){
    checkoutItems = [];
    checkoutPrices = [];
    checkoutItemIds = [];
    relatedTo = [];
    chefName = [];
    priceList = [];
    total = 0;
    document.getElementById("chout").innerHTML = "";
    document.getElementById("total").innerHTML = total;
}

function proceedToPay(){
    if(total == 0){
        alert("Please Add Items to Checkout!");
        return;
    }
    if(isLoggedIn()) {
            
        var logedinUser = JSON.parse(localStorage.getItem("logedInUser"));

        var itemNameList="";
        for (var i = 0; i < checkoutItems.length; i++) {
            itemNameList += checkoutItems[i]+", ";
        }

        // price: lessonPrice,
        // items: itemName,
        // logedinUserName: logedinUser.name,
        // logedinUserEmail: logedinUser.username,
        // lessonId:lesson_Id,
        // relatedTo:related_To,
        // chefName:chef_Name,
    
        var paymentObject = {
            price: total,
            items: checkoutItems,
            logedinUserName: logedinUser.name,
            logedinUserEmail: logedinUser.username,
            lessonId:checkoutItemIds,
            relatedTo:relatedTo,
            chefName:chefName,
            priceArr: priceList,
        };
    
        pay(paymentObject);
    
    }else{
        alert("Please Login First!");
        window.location.href = "login.html";
    }
}