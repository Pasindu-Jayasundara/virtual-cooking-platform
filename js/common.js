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



var chefArray = [
    {
        id: 1,
        name: "Maria Sanchez",
        town: "New York City, USA",
        numberOfTutorials: 5,
        experience: 15,
        desc:"Award-winning chef specializing in Latin American cuisine, known for her vibrant flavors and innovative cooking techniques",
        image: "../resources/chef/1.jpg",
    },
    {
        id: 2,
        name: "Pierre Dubois",
        town: "Paris, France",
        numberOfTutorials: 5,
        experience: 20,
        desc:"Renowned French chef with expertise in classical French cuisine, trained in Michelin-starred restaurants across France",
        image: "../resources/chef/2.jpg",
    },
    {
        id: 3,
        name: "Mei Chen",
        town: "Shanghai, China",
        numberOfTutorials: 5,
        experience: 10,
        desc:"Master of authentic Chinese cuisine, blending traditional techniques with modern twists, known for her exquisite dim sum and Sichuan specialties",
        image: "../resources/chef/3.jpg",
    },
    {
        id: 4,
        name: "Alessandro Rossi",
        town: "Rome, Italy",
        numberOfTutorials: 5,
        experience: 10,
        desc:"Italian culinary maestro specializing in regional Italian cuisine, from hearty Tuscan dishes to delicate Venetian seafood",
        image: "../resources/chef/4.jpg",
    },
    {
        id: 5,
        name: "Ana Silva",
        town: "Rio de Janeiro, Brazil",
        numberOfTutorials: 5,
        experience: 12,
        desc:"Brazilian culinary artist renowned for her innovative approach to traditional Brazilian cuisine, blending indigenous flavors with contemporary flair",
        image: "../resources/chef/5.jpg",
    },
];
localStorage.setItem("chefs", JSON.stringify(chefArray));




var tutorialArr = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        image: "../resources/food/1.png",
        video: "https://www.youtube.com/embed/jlcFwYwiuwY?si=5MTW4BkEg4ywV67h",
        price: "70.00",
        related_to: "American Cuisine",
        description: "A classic Italian pasta dish featuring spaghetti tossed in a creamy sauce with crispy pancetta, Parmesan cheese, and a hint of black pepper",
        chef_name: "Maria Sanchez",
        chefId: 1
    },
    {
        id: 2,
        name: "Grilled Salmon Fillet",
        image: "../resources/food/2.png",
        video: "https://www.youtube.com/embed/n7SJ2hOgqOc?si=q6C3ags9_-xFUHLY",
        price: "50.00",
        related_to: "American Cuisine",
        description: "Succulent salmon fillet marinated in a blend of fresh herbs and grilled to perfection, offering a delicate balance of flavors and a tender, flaky texture",
        chef_name: "Maria Sanchez",
        chefId: 1
    },
    {
        id: 3,
        name: "Classic Caesar Salad",
        image: "../resources/food/3.png",
        video: "https://www.youtube.com/embed/yPDhG4cuunQ?si=0N2iE9ZfXr5xBVG3",
        price: "30.00",
        related_to: "Sri Lankan Cuisine",
        description: "Crisp romaine lettuce tossed in creamy Caesar dressing, topped with shaved parmesan cheese, homemade croutons, and a hint of lemon for a refreshing bite",
        chef_name: "Maria Sanchez",
        chefId: 1
    },
    {
        id: 4,
        name: "Spaghetti Bolognese",
        image: "../resources/food/4.png",
        video: "https://www.youtube.com/embed/v2WqcHH65NQ?si=RtRPM8t0ULwR_p_K",
        price: "40.00",
        related_to: "American Cuisine",
        description: "Homemade spaghetti pasta served with a hearty Bolognese sauce made from ground beef, tomatoes, onions, and aromatic herbs, creating a rich and comforting dish",
        chef_name: "Maria Sanchez",
        chefId: 1
    },
    {
        id: 5,
        name: "Chicken Alfredo",
        image: "../resources/food/5.png",
        video: "https://www.youtube.com/embed/LPPcNPdq_j4?si=GAhMdRMZxjwwIJP8",
        price: "150.00",
        related_to: "Australian Cuisine",
        description: "Tender grilled chicken breast served over fettuccine pasta, smothered in a creamy Alfredo sauce made with butter, garlic, parmesan cheese, and a touch of nutmeg",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
    {
        id: 6,
        name: "Margherita Pizza",
        image: "../resources/food/6.png",
        video: "https://www.youtube.com/embed/4VSW29yWPlA?si=DFgC0IV_Q8IQzIpY",
        price: "100.00",
        related_to: "American Cuisine",
        description: "A classic Italian pizza topped with tangy tomato sauce, fresh mozzarella cheese, fragrant basil leaves, and a drizzle of extra virgin olive oil on a thin crispy crust",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
    {
        id: 7,
        name: "BBQ Pulled Pork Sandwiches",
        image: "../resources/food/7.png",
        video: "https://www.youtube.com/embed/cMUZxpBZqCo?si=gviP853OUfT_peSt",
        price: "76.00",
        related_to: "American Cuisine",
        description: "Slow-cooked pulled pork tossed in smoky BBQ sauce, piled high on a toasted bun with crisp coleslaw, creating a savory and satisfying sandwich",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
    {
        id: 8,
        name: "Beef Tenderloin Steak",
        image: "../resources/food/8.png",
        video: "https://www.youtube.com/embed/-cW9gbpvrKE?si=2owoRUzfPJHOPgDR",
        price: "80.00",
        related_to: "Italian Cuisine",
        description: "A premium cut of beef tenderloin, seasoned and grilled to your desired level of doneness, offering a melt-in-your-mouth experience with every bite",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
    {
        id: 9,
        name: "Vegetable Stir-Fry",
        image: "../resources/food/9.png",
        video: "https://www.youtube.com/embed/h8IXBipqYgs?si=fcMnz4hWnscsbwMO",
        price: "90.00",
        related_to: "Australian Cuisine",
        description: "Fresh garden vegetables stir-fried in a savory soy-based sauce, served with your choice of steamed rice or noodles for a wholesome and flavorful vegetarian option",
        chef_name: "Mei Chen",
        chefId: 3
    },
    {
        id: 10,
        name: "Lemon Garlic Shrimp",
        image: "../resources/food/10.png",
        video: "https://www.youtube.com/embed/_M9MHFhANw4?si=lEk9JVPnkMTRfG8G",
        price: "230.00",
        related_to: "Indian Cuisine",
        description: "Succulent shrimp sautéed in a zesty lemon-garlic butter sauce, served with a side of seasoned rice or garlic bread for a burst of Mediterranean flavors",
        chef_name: "Mei Chen",
        chefId: 3
    },
    {
        id: 11,
        name: "Tandoori Chicken",
        image: "../resources/food/11.png",
        video: "https://www.youtube.com/embed/-CKvt1KNU74?si=WdH2jZQiEcwOhm4R",
        price: "425.00",
        related_to: "American Cuisine",
        description: "Juicy chicken marinated in a blend of yogurt and aromatic spices, roasted in a traditional tandoor oven, resulting in tender, flavorful meat with a smoky finish",
        chef_name: "Mei Chen",
        chefId: 3
    },
    {
        id: 12,
        name: "Caprese Salad",
        image: "../resources/food/12.png",
        video: "https://www.youtube.com/embed/i-TAfCQ62q0?si=ooCuWyhZpQJxy16w",
        price: "130.00",
        related_to: "American Cuisine",
        description: "Fresh mozzarella, tomatoes, basil, olive oil, and balsamic glaze",
        chef_name: "Mei Chen",
        chefId: 3
    },
    {
        id: 13,
        name: "Sushi Platter",
        image: "../resources/food/13.png",
        video: "https://www.youtube.com/embed/ll7bFxr-kag?si=5_7dU5iESVX6Dn4b",
        price: "70.00",
        related_to: "Japanese Cuisine",
        description: " Assorted sushi rolls including California, tuna, and salmon rolls",
        chef_name: "Alessandro Rossi",
        chefId: 4
    },
    {
        id: 14,
        name: "Mushroom Risotto",
        image: "../resources/food/14.png",
        video: "https://www.youtube.com/embed/srqZ5jsvXEc?si=KCVB0kQVBVGYARsO",
        price: "84.00",
        related_to: "Italian Cuisine",
        description: "Creamy risotto cooked with mushrooms, parmesan cheese, and herbs",
        chef_name: "Alessandro Rossi",
        chefId: 4
    },
    {
        id: 15,
        name: "Eggplant Parmesan",
        image: "../resources/food/15.png",
        video: "https://www.youtube.com/embed/QNxUqC0f1Tk?si=tveE8xBJAlHYKwfE",
        price: "50.00",
        related_to: "Germany Cuisine",
        description: "Breaded and fried eggplant slices topped with marinara sauce and cheese",
        chef_name: "Alessandro Rossi",
        chefId: 4
    },
    {
        id: 16,
        name: "Fettuccine Carbonara",
        image: "../resources/food/16.png",
        video: "https://www.youtube.com/embed/jlcFwYwiuwY?si=65sfZfJXw2mF4LTy",
        price: "30.00",
        related_to: "India Cuisine",
        description: "Creamy pasta with crispy bacon, parmesan cheese, and eggs",
        chef_name: "Alessandro Rossi",
        chefId: 4
    },
    {
        id: 17,
        name: "Beef Burger",
        image: "../resources/food/17.png",
        video: "https://www.youtube.com/embed/BIG1h2vG-Qg?si=rzOB2lWXgq8-XQ5",
        price: "46.00",
        related_to: "Australian Cuisine",
        description: "Juicy beef patty with lettuce, tomato, onion, and cheese on a bun",
        chef_name: "Ana Silva",
        chefId: 5
    },
    {
        id: 18,
        name: "Lobster Ravioli",
        image: "../resources/food/18.png",
        video: "https://www.youtube.com/embed/Irdrl0RnlKQ?si=QrZvjI2oR3iiSFoG",
        price: "82.00",
        related_to: "American Cuisine",
        description: "Ravioli stuffed with lobster meat, served in a creamy sauce",
        chef_name: "Ana Silva",
        chefId: 5
    },
    {
        id: 19,
        name: "Vegetable Pad Thai",
        image: "../resources/food/19.png",
        video: "https://www.youtube.com/embed/zy_P70hXhdM?si=VIr_JFTo-Bfd5Z0_",
        price: "60.00",
        related_to: "Asian Cuisine",
        description: "Stir-fried rice noodles with vegetables, tofu, and Thai spices",
        chef_name: "Ana Silva",
        chefId: 5
    },
    {
        id: 20,
        name: "Chocolate Lava Cake",
        image: "../resources/food/20.png",
        video: "https://www.youtube.com/embed/_hQAjxefiGQ?si=4AvJKvk6Y0nQ824p",
        price: "94.00",
        related_to: "American Cuisine",
        description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream",
        chef_name: "Ana Silva",
        chefId: 5
    },
];
localStorage.setItem("tutorials", JSON.stringify(tutorialArr));


var reviewArray = [
    {
        id: 1,
        name: "Sarah Smith",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 1,
    },
    {
        id: 2,
        name: "Sarah Smith",
        review: "As someone who's new to cooking, I found the virtual platform incredibly helpful. The step-by-step instructions were easy to follow, and I appreciated the variety of cuisines available. Highly recommend!",
        userEmail: "john.doe@gmail.com",
        lessonId: 1,
    },
    {
        id: 3,
        name: "Emily Johnson",
        review: "The virtual cooking platform exceeded my expectations. The live classes felt interactive, and I enjoyed being able to ask questions in real-time. Plus, the recipes turned out amazing!",
        userEmail: "emily.johnson@gmail.com",
        lessonId: 2,
    },
    {
        id: 4,
        name: "David Lee",
        review: "Great platform for honing your cooking skills! The pre-recorded classes are convenient, and the instructors are knowledgeable. I've already recommended it to friends.",
        userEmail: "david.lee@gmail.com",
        lessonId: 2,
    },
    {
        id: 5,
        name: "Sarah Smith",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 3,
    },
    {
        id: 6,
        name: "Maria Garcia",
        review: "I've been using the virtual cooking platform for a few weeks now, and I'm hooked! The recipes are diverse, the videos are well-produced, and the community aspect is fantastic.",
        userEmail: "maria.garcia@gmail.com",
        lessonId: 3,
    },
    {
        id: 7,
        name: "Michael Brown",
        review: "I've tried other online cooking classes before, but this platform stands out for its quality. The instructors are passionate, and the recipes are restaurant-quality. Can't wait to try more!",
        userEmail: "michael.brown@gmail.com",
        lessonId: 4,
    },
    {
        id: 8,
        name: "Sarah Smith",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 4,
    },
    {
        id: 9,
        name: "Lisa Nguyen",
        review: "Virtual cooking classes have been a game-changer for me. I appreciate the flexibility to learn at my own pace, and the variety of classes means there's always something new to try.",
        userEmail: "lisa.nguyen@gmail.com",
        lessonId: 5,
    },
    {
        id: 10,
        name: "Daniel Kim",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 6,
    },
    {
        id: 11,
        name: "Sarah Smith",
        review: "The virtual cooking platform is perfect for busy professionals like myself. I can fit classes into my schedule, and the recipes are manageable yet impressive. Plus, the instructors are top-notch!",
        userEmail: "daniel.kim@gmail.com",
        lessonId: 7,
    },
    {
        id: 12,
        name: "Jessica Martinez",
        review: "The virtual cooking platform is perfect for busy professionals like myself. I can fit classes into my schedule, and the recipes are manageable yet impressive. Plus, the instructors are top-notch!",
        userEmail: "daniel.kim@gmail.com",
        lessonId: 8,
    },
    {
        id: 13,
        name: "Sarah Smith",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 8,
    },
    {
        id: 14,
        name: "Jessica Martinez",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 9,
    },
    {
        id: 15,
        name: "Sarah Smith",
        review: "I've always wanted to improve my cooking skills, and this platform made it easy and fun. The classes are well-structured, and I appreciate the attention to detail in each recipe.",
        userEmail: "jessica.martinez@gmail.com",
        lessonId: 9,
    },
    {
        id: 16,
        name: "Ryan Thompson",
        review: "I've been using the virtual cooking platform to bond with my kids, and it's been a blast! The family-friendly recipes are a hit, and it's a great way to spend quality time together.",
        userEmail: "ryan.thompson@gmail.com",
        lessonId: 10,
    },
    {
        id: 17,
        name: "Sophie Williams",
        review: "I'm a vegetarian, and I was pleasantly surprised by the variety of plant-based recipes available on the platform. The instructors offer great tips for making meatless meals flavorful and satisfying.",
        userEmail: "sophie.williams@gmail.com",
        lessonId: 11,
    },
    {
        id: 18,
        name: "Ahmed Ali",
        review: "I've been using the virtual cooking platform to expand my culinary skills, and it's been a fantastic journey. The classes are well-paced, and I appreciate the emphasis on technique.",
        userEmail: "ahmed.ali@gmail.com",
        lessonId: 12,
    },
    {
        id: 19,
        name: "Rachel Chang",
        review: "The virtual cooking platform has been a lifesaver during the pandemic. It's helped me stay inspired in the kitchen and discover new flavors from around the world. Highly recommend!",
        userEmail: "rachel.chang@gmail.com",
        lessonId: 13,
    },
    {
        id: 20,
        name: "Thomas Johnson",
        review: "As a busy parent, I appreciate how convenient the platform is. I can access classes anytime, anywhere, and the recipes are simple enough to make even on hectic weeknights.",
        userEmail: "thomas.johnson@gmail.com",
        lessonId: 13,
    },
    {
        id: 21,
        name: "Sarah Smith",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 14,
    },
    {
        id: 22,
        name: "Jessica Martinez",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 15,
    },
    {
        id: 23,
        name: "Sarah Smith",
        review: "I've always wanted to improve my cooking skills, and this platform made it easy and fun. The classes are well-structured, and I appreciate the attention to detail in each recipe.",
        userEmail: "jessica.martinez@gmail.com",
        lessonId: 16,
    },
    {
        id: 24,
        name: "Lisa Nguyen",
        review: "Virtual cooking classes have been a game-changer for me. I appreciate the flexibility to learn at my own pace, and the variety of classes means there's always something new to try.",
        userEmail: "lisa.nguyen@gmail.com",
        lessonId: 17,
    },
    {
        id: 25,
        name: "Daniel Kim",
        review: "Absolutely loved the virtual cooking classes! The instructors were engaging, the recipes were delicious, and I learned so much. Can't wait to try more classes!",
        userEmail: "sarah.smith@gmail.com",
        lessonId: 18,
    },
    {
        id: 26,
        name: "Sarah Smith",
        review: "The virtual cooking platform is perfect for busy professionals like myself. I can fit classes into my schedule, and the recipes are manageable yet impressive. Plus, the instructors are top-notch!",
        userEmail: "daniel.kim@gmail.com",
        lessonId: 18,
    },
    {
        id: 27,
        name: "Jessica Martinez",
        review: "The virtual cooking platform is perfect for busy professionals like myself. I can fit classes into my schedule, and the recipes are manageable yet impressive. Plus, the instructors are top-notch!",
        userEmail: "daniel.kim@gmail.com",
        lessonId: 19,
    },
    {
        id: 28,
        name: "Sarah Smith",
        review: "As someone who's new to cooking, I found the virtual platform incredibly helpful. The step-by-step instructions were easy to follow, and I appreciated the variety of cuisines available. Highly recommend!",
        userEmail: "john.doe@gmail.com",
        lessonId: 20,
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
        name: "Spaghetti Carbonara",
        image: "../resources/food/1.png",
        video: "https://www.youtube.com/embed/jlcFwYwiuwY?si=5MTW4BkEg4ywV67h",
        price: "70.00",
        related_to: "American Cuisine",
        description: "A classic Italian pasta dish featuring spaghetti tossed in a creamy sauce with crispy pancetta, Parmesan cheese, and a hint of black pepper",
        chef_name: "Maria Sanchez",
        chefId: 1
    },
    {
        id: 2,
        name: "Classic Caesar Salad",
        image: "../resources/food/3.png",
        video: "https://www.youtube.com/embed/yPDhG4cuunQ?si=0N2iE9ZfXr5xBVG3",
        price: "30.00",
        related_to: "Sri Lankan Cuisine",
        description: "Crisp romaine lettuce tossed in creamy Caesar dressing, topped with shaved parmesan cheese, homemade croutons, and a hint of lemon for a refreshing bite",
        chef_name: "Maria Sanchez",
        chefId: 1
    },

        {
        id: 3,
        name: "Chicken Alfredo",
        image: "../resources/food/5.png",
        video: "https://www.youtube.com/embed/LPPcNPdq_j4?si=GAhMdRMZxjwwIJP8",
        price: "150.00",
        related_to: "Australian Cuisine",
        description: "Tender grilled chicken breast served over fettuccine pasta, smothered in a creamy Alfredo sauce made with butter, garlic, parmesan cheese, and a touch of nutmeg",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
        {
        id: 4,
        name: "BBQ Pulled Pork Sandwiches",
        image: "../resources/food/7.png",
        video: "https://www.youtube.com/embed/cMUZxpBZqCo?si=gviP853OUfT_peSt",
        price: "76.00",
        related_to: "American Cuisine",
        description: "Slow-cooked pulled pork tossed in smoky BBQ sauce, piled high on a toasted bun with crisp coleslaw, creating a savory and satisfying sandwich",
        chef_name: "Pierre Dubois",
        chefId: 2
    },
        {
        id: 5,
        name: "Vegetable Stir-Fry",
        image: "../resources/food/9.png",
        video: "https://www.youtube.com/embed/h8IXBipqYgs?si=fcMnz4hWnscsbwMO",
        price: "90.00",
        related_to: "Australian Cuisine",
        description: "Fresh garden vegetables stir-fried in a savory soy-based sauce, served with your choice of steamed rice or noodles for a wholesome and flavorful vegetarian option",
        chef_name: "Mei Chen",
        chefId: 3
    },
        {
        id: 6,
        name: "Tandoori Chicken",
        image: "../resources/food/11.png",
        video: "https://www.youtube.com/embed/-CKvt1KNU74?si=WdH2jZQiEcwOhm4R",
        price: "425.00",
        related_to: "American Cuisine",
        description: "Juicy chicken marinated in a blend of yogurt and aromatic spices, roasted in a traditional tandoor oven, resulting in tender, flavorful meat with a smoky finish",
        chef_name: "Mei Chen",
        chefId: 3
    },
        {
        id: 7,
        name: "Sushi Platter",
        image: "../resources/food/13.png",
        video: "https://www.youtube.com/embed/ll7bFxr-kag?si=5_7dU5iESVX6Dn4b",
        price: "70.00",
        related_to: "Japanese Cuisine",
        description: " Assorted sushi rolls including California, tuna, and salmon rolls",
        chef_name: "Alessandro Rossi",
        chefId: 4
    },

];
localStorage.setItem("trending", JSON.stringify(trending));

if(localStorage.getItem("recent") == null) {
    var recentlyAccessed = [
        {
            id: 1,
            lessonId: 1,
        },
        {
            id: 2,
            lessonId: 1,
        },
        {
            id: 3,
            lessonId: 1,
        },
        {
            id: 4,
            lessonId: 1,
        },
    ];
    localStorage.setItem("recent", JSON.stringify(recentlyAccessed));
}





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