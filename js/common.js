// var chefId = null;
// var chefArr=null;

window.addEventListener("load", function() {

    var pageUrl = window.location.href.split("/").pop();
    // if(pageUrl.split("?").length > 1) {
        
    //     pageUrl = pageUrl.split("?")[1];
    //     chefId = pageUrl.split("=")[1];

    //     pageUrl = window.location.href.split("/").pop();
    //     pageUrl = pageUrl.split("?")[0];
    // }

    if(pageUrl!=undefined && pageUrl == "user_profile.html" || pageUrl == "chef_profile.html") {

        // if(chefId != null) {

        //     chefArr = JSON.parse(localStorage.getItem("chefs"));
        //     this.document.getElementsByTagName("body")[0].style.display = "block";
        //     this.document.getElementById("new_tu_btn").style.display = "none";

        // }else{
            if(isLoggedIn()) {
                this.document.getElementsByTagName("body")[0].style.display = "block";
    
                if(pageUrl == "user_profile.html") {
                    this.document.getElementById("user_profile-name").innerHTML =  JSON.parse(localStorage.getItem("logedInUser")).name;
                }
            }else{
                window.location.href = "login.html";
            }
        // }

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