window.addEventListener("load", function() {

    var pageUrl = window.location.href.split("/").pop();

    if(pageUrl!=undefined && pageUrl == "user_profile.html" || pageUrl == "chef_profile.html" || pageUrl == "cart.html") {

            if(isLoggedIn()) {
                this.document.getElementsByTagName("body")[0].style.display = "block";
    
                if(pageUrl == "user_profile.html") {
                    this.document.getElementById("user_profile-name").innerHTML =  JSON.parse(localStorage.getItem("logedInUser")).name;
                }
            }else{
                window.location.href = "login.html";
            }

    }else if(pageUrl == "lesson.html"){
        this.window.history.back(); // no lesson id
    }

});


function setLogedInUser(user) {
    localStorage.setItem("logedInUser", JSON.stringify(user));
}

function isLoggedIn() {
    return localStorage.getItem("logedInUser") != null;
}

function validateEmail(email) {
    
    var validEmailFormat = /^[^+@]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
    return validEmailFormat.test(email);
}

function validatePassword(password) {
    
    var validPasswordFormat = /^[a-zA-Z0-9]{8,}$/;
    return validPasswordFormat.test(password);
}

function isUsersAvaliable() {
    
    if(localStorage.getItem("users") == null) {
        return false;
    }
    return true;
}


function pay(paymentDetails){

    // var paymentObject = {
    //     price: lessonPrice,
    //     items: itemName,
    //     logedinUserName: logedinUser.name,
    //     logedinUserEmail: logedinUser.username,
    // };

    var itemName = "";
    if(Array.isArray(paymentDetails.items)){
        
        for (var i = 0; i < paymentDetails.items.length; i++) {
            itemName += paymentDetails.items[i]+", ";
        }

    }else{
        itemName = paymentDetails.items;
    }

    var order_id=new Date().getTime();

    // Payment completed. It can be a successful failure.
    payhere.onCompleted = function onCompleted(orderId) {
        alert("Payment completed. OrderID:" + orderId);
        addToPurchasedTutorial(paymentDetails,order_id);
        // Note: validate the payment and show success or failure page to the customer
    };

    // Payment window closed
    payhere.onDismissed = function onDismissed() {
        // Note: Prompt user to pay again or show an error page
        alert("Payment dismissed");
        addToPurchasedTutorial(paymentDetails,order_id);
    };

    // Error occurred
    payhere.onError = function onError(error) {
        // Note: show an error page
        alert("Error:"  + error);
    };

    // Put the payment variables here
    var payment = {
        "sandbox": true,
        "merchant_id": "1226441",    // Replace your Merchant ID
        "return_url": "http://127.0.0.1:5500/search.html",     // Important
        "cancel_url": "http://127.0.0.1:5500/search.html",     // Important
        "notify_url": "http://sample.com/notify",
        "order_id": order_id,
        "items": itemName,
        "amount": paymentDetails.price,
        "currency": "LKR",
        "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC", // *Replace with generated hash retrieved from backend
        "first_name": paymentDetails.logedinUserName,
        "last_name": "",
        "email": paymentDetails.logedinUserEmail,
        "phone":"0740211671",
        "address": "testing address",
        "city": "colombo",
        "country": "sri lanka",
        "delivery_address": "",
        "delivery_city": "",
        "delivery_country": "",
        "custom_1": "",
        "custom_2": ""
    };

    payhere.startPayment(payment);

}


// load chefs
const axios = require('axios').default;
axios.get(`${process.env.SERVER_URL}/api/chefs`)
  .then(function (response) {
    // handle success
    console.log("load chef: "+response);
  })
  .catch(function (error) {
    // handle error
    console.log("load chef: "+error);
  })
  .finally(function () {
    // always executed
    console.log("load chef: always executed");

  });

// chef
// tutorial
// review
// cart
// trending
// purchased_tutorials











function addToPurchasedTutorial(purchasedObject,order_id) {
    // var purchasedObject = {
    //     price: lessonPrice,
    //     items: itemName,
    //     logedinUserName: logedinUser.name,
    //     logedinUserEmail: logedinUser.username,
    //     lessonId:lesson_Id,
    //     relatedTo:related_To,
    //     chefName:chef_Name,
    // };

    var logedInUser = JSON.parse(localStorage.getItem("logedInUser"));

    if(Array.isArray(purchasedObject.items)){
        
        for (var i = 0; i < purchasedObject.items.length; i++) {
            
            var purchasedTutorialObject = {
                id: purchasedObject.order_id,
                name: purchasedObject.items[i],
                related_to: purchasedObject.relatedTo[i],
                chef_name: purchasedObject.chefName[i],
                lessonId: purchasedObject.lessonId[i],
            };

            logedInUser.purchased_tutorials.push(purchasedTutorialObject);

        }

    }else{
        var purchasedTutorialObject = {
            id: purchasedObject.order_id,
            name: purchasedObject.items,
            related_to: purchasedObject.relatedTo,
            chef_name: purchasedObject.chefName,
            lessonId: purchasedObject.lessonId,
        };

        logedInUser.purchased_tutorials.push(purchasedTutorialObject);
    }


    localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

    var users = JSON.parse(localStorage.getItem("users"));
    users[logedInUser.username] = logedInUser;
    localStorage.setItem("users", JSON.stringify(users));

    addToPaymentHistory(purchasedObject,order_id);

}

function addToPaymentHistory(purchasedObject,order_id){

    // name: "How to make a cake",
    // chef_name: "Chef A",
    // purchased_date: "2021-09-01",
    // paid_amount: "1000.00"

    var logedInUser = JSON.parse(localStorage.getItem("logedInUser"));

    if(Array.isArray(purchasedObject.items)){

        for (var i = 0; i < purchasedObject.items.length; i++) {

            var paymentObject = {
                order_id: order_id,
                price: purchasedObject.priceArr[i],
                items: purchasedObject.items[i],
                logedinUserName: purchasedObject.logedinUserName,
                logedinUserEmail: purchasedObject.logedinUserEmail,
                lessonId:purchasedObject.lessonId[i],
                relatedTo:purchasedObject.relatedTo[i],
                chefName:purchasedObject.chefName[i],
            };

            logedInUser.payment_history.push(paymentObject);

        }
    }else{
        var paymentObject = {
            order_id: order_id,
            price: purchasedObject.price,
            items: purchasedObject.items,
            logedinUserName: purchasedObject.logedinUserName,
            logedinUserEmail: purchasedObject.logedinUserEmail,
            lessonId:purchasedObject.lessonId,
            relatedTo:purchasedObject.relatedTo,
            chefName:purchasedObject.chefName,
        };

        logedInUser.payment_history.push(paymentObject);

    }

    localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

    var users = JSON.parse(localStorage.getItem("users"));
    users[logedInUser.username] = logedInUser;
    localStorage.setItem("users", JSON.stringify(users));

}