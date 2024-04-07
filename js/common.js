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

    console.log(paymentDetails)

    // Payment completed. It can be a successful failure.
    payhere.onCompleted = function onCompleted(orderId) {
        alert("Payment completed. OrderID:" + orderId);
        // Note: validate the payment and show success or failure page to the customer
    };

    // Payment window closed
    payhere.onDismissed = function onDismissed() {
        // Note: Prompt user to pay again or show an error page
        alert("Payment dismissed");
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
        "order_id": new Date().getTime(),
        "items": paymentDetails.items,
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



var chefArray = [
    {
        id: 1,
        name: "a",
        town: "Town1",
        numberOfTutorials: 10,
        experience: 5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "../resources/images/cheff5.png",
    },
    {
        id: 2,
        name: "c",
        town: "Town1",
        numberOfTutorials: 10,
        experience: 5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "../resources/images/cheff5.png",
    },
    {
        id: 3,
        name: "vf",
        town: "Town1",
        numberOfTutorials: 10,
        experience: 5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "../resources/images/cheff5.png",
    },
    {
        id: 4,
        name: "Chef1",
        town: "Towsdcn1",
        numberOfTutorials: 10,
        experience: 5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "../resources/images/cheff5.png",
    },
];
localStorage.setItem("chefs", JSON.stringify(chefArray));




var tutorialArr = [
    {
        id: 1,
        name: "a",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
    {
        id: 2,
        name: "c",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 2
    },
    {
        id: 3,
        name: "vf",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
    {
        id: 4,
        name: "Chef1",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 2
    },
];
localStorage.setItem("tutorials", JSON.stringify(tutorialArr));


var reviewArray = [
    {
        id: 1,
        name: 1,
        review: "This is a great tutorial",
        userEmail: "a@gmail.com",
        lessonId: 1,
    },
    {
        id: 2,
        name: 1,
        review: "This is a great tutorial",
        userEmail: "a@gmail.com",
        lessonId: 2,
    },
    {
        id: 3,
        name: 1,
        review: "This is a great tutorial",
        userEmail: "a@gmail.com",
        lessonId: 3,
    },
    {
        id: 4,
        name: 1,
        review: "This is a great tutorial",
        userEmail: "a@gmail.com",
        lessonId: 4,
    },
];
localStorage.setItem("reviews", JSON.stringify(reviewArray));



if(localStorage.getItem("users") == null) {

    var userObj = {
        "a@gmail.com":{
            name: "a",
            username: "",
            password: "",
            purchased_tutorials: null,
            payment_history: null,
            recently_accessed: null,
            isChef: false,
            my_tutorials: null,
            image: "../resources/images/cheff5.png",
        },
        "c@gmail.com":{
            name: "a",
            username: "",
            password: "",
            purchased_tutorials: null,
            payment_history: null,
            recently_accessed: null,
            isChef: false,
            my_tutorials: null,
            image: "../resources/images/cheff5.png",
        },
    };

    localStorage.setItem("users", JSON.stringify(userObj));
}


if(localStorage.getItem("cart") == null) {
    var cartArray = [
        // {
        //     id: 1,
        //     lessonId: 1,
        // },
        // {
        //     id: 2,
        //     lessonId: 2,
        // },
        // {
        //     id: 3,
        //     lessonId: 3,
        // },
        // {
        //     id: 4,
        //     lessonId: 4,
        // },
    ];
    localStorage.setItem("cart", JSON.stringify(cartArray));
}

var trending = [
    {
        id: 1,
        name: "a",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
    {
        id: 2,
        name: "a",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
    {
        id: 3,
        name: "a",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
    {
        id: 4,
        name: "a",
        image: "../resources/images/cheff5.png",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
        price: "1000.00",
        related_to: "American Cuisine",
        description: "This is a tutorial on how to make a cake",
        chef_name: "Chef A",
        chefId: 1
    },
];
localStorage.setItem("trending", JSON.stringify(trending));