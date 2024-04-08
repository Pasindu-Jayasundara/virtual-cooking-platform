var lessonId=null;
var loggedIn = false;
var isPurchased = false;

window.addEventListener("load", function () { 

    var pageUrl = window.location.href.split("/").pop();
    if(pageUrl.split("?").length > 1) {
        
        pageUrl = pageUrl.split("?")[1];
        lessonId = pageUrl.split("=")[1];
    }
    
    if(lessonId != null) {
        loadLessonData();
        loadLessonReviews();
        loadSuggestions();
        addToRecent();
    }
});

function addToRecent(){

    var logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    var recentArr = logedInUser.recently_accessed;

    if(recentArr != null){
        console.log(recentArr);
        var inRecentArray = false;

        for(var i=0; i<recentArr.length; i++){
            if(recentArr[i].lessonId == lessonId){
                inRecentArray = true;
                break;
            }
        }

        if(!inRecentArray){

            var recentObj ={
                id:recentArr.length,
                lessonId: lessonId,
            };
            recentArr.push(recentObj);
            logedInUser.recently_accessed = recentArr;
            localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

            var userObj = JSON.parse(localStorage.getItem("users"));
            userObj[logedInUser.username] = logedInUser;
            localStorage.setItem("users", JSON.stringify(userObj));

        }

    }
    
}

function loadLessonData() {
    var lessonArr = JSON.parse(localStorage.getItem("tutorials"));

    if(lessonArr!=null){

        var lesson = lessonArr[lessonId-1];

        if(isLoggedIn()){
            
            var logedinUser = JSON.parse(localStorage.getItem("logedInUser"));
            if(logedinUser.purchased_tutorials != null){
                
                var purchasedTutorialArr = logedinUser.purchased_tutorials;
                // for(var cardKey in purchasedTutorialObj){
                //     var card = purchasedTutorialObj[cardKey];
                //     if(card.id == lessonId){
                //         isPurchased = true;
                //         break;
                //     }
                // }

                for(var i=0; i<purchasedTutorialArr.length; i++){

                    if(purchasedTutorialArr[i].lessonId == lessonId){
                        isPurchased = true;
                        break;
                    }
                }
            }

            if(isPurchased){
                document.getElementById("lesson_video_url").setAttribute("src", lesson.video);
                document.getElementById("lesson_video_url").style.display = "block";
                document.getElementById("lesson-video-cover").style.display = "none";
            }else{
                document.getElementById("lesson_video_url").style.display = "none";
                document.getElementById("lesson-video-cover").style.display = "flex";
                document.getElementById("lesson-video-cover").style.backgroundColor = "black";
                document.getElementById("lesson-video-cover").innerHTML= "Please purchase the lesson to view the video";
                document.getElementById("lesson-video-cover").style.cursor = "pointer";
                document.getElementById("lesson-video-cover").onclick = function(){
                    window.location.href = "search.html";
                }
            }

        }else{
            document.getElementById("lesson_video_url").style.display = "none";
            document.getElementById("lesson-video-cover").style.display = "flex";
            document.getElementById("lesson-video-cover").style.backgroundColor = "black";
            document.getElementById("lesson-video-cover").style.cursor = "pointer";
                document.getElementById("lesson-video-cover").onclick = function(){
                    window.location.href = "login.html";
                }
        }
        document.getElementById("lesson_title").innerHTML = lesson.name;
        document.getElementById("lesson_desc").innerHTML = lesson.description;
        document.getElementById("lesson_by").innerHTML = lesson.chef_name;
        

    }

}

function loadLessonReviews(){

    var reviewArr = JSON.parse(localStorage.getItem("reviews"));
    if(reviewArr!=null){

        var reviewCardList = "";

        reviewArr.forEach(reviewObj => {
            
            if(reviewObj.lessonId == lessonId){
                
                var reviewCard = `
                    <div class="lesson-comment">
                        <div class="lesson-comment-user-image" style="background-image:url('../resources/images/emptyProfile.png');"></div>
                        <div class="lesson-name-and-comment">
                            <div class="lesson-comment-user-name">${reviewObj.name}</div>
                            <div class="lesson-comment-user-comment">
                                ${reviewObj.review}  
                            </div>
                        </div>
                    </div>
                `;

                reviewCardList += reviewCard;
            }

        });
        document.getElementById("lesson_review_container").innerHTML = reviewCardList;

    }

}

function loadSuggestions() {  

    var lessonArr = JSON.parse(localStorage.getItem("tutorials"));

    if (lessonArr != null) {
      var suggestCardList = "";
  
        for (var i = lessonArr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = lessonArr[i];
            lessonArr[i] = lessonArr[j];
            lessonArr[j] = temp;
        }

        for (var id in lessonArr) {
    
            var card = lessonArr[id];
            var suggestCard = `
                <div class="lesson-suggest-1-container" onclick="gotoLesston(${card.id});">
                    <div class="suggest-lesson-image" style="background-image:url(${card.image});"></div>
                    <div class="suggest-lesson-name">${card.name}</div>
                </div>
            `;
            suggestCardList += suggestCard;
        }
  
        document.getElementById("suggestCardContainer").innerHTML = suggestCardList;
    }
}

function gotoLesston(lessonid){
    window.location.href = "lesson.html?lesson_id="+lessonid;
}

function playVideo(event) {
    event.preventDefault();
    // document.getElementById("lesson_video").play();
}