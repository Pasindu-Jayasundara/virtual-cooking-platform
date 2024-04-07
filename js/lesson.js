var lessonId=null;

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
    }


});

function loadLessonData() {

    var lessonArr = JSON.parse(localStorage.getItem("tutorials"));

    if(lessonArr!=null){

        var lesson = lessonArr[lessonId-1];

        document.getElementById("lesson_video_url").setAttribute("src", lesson.video);
        document.getElementById("lesson_title").innerHTML = lesson.name;
        document.getElementById("lesson_desc").innerHTML = lesson.description;
        document.getElementById("lesson_by").innerHTML = lesson.chef_name;

    }

}

function loadLessonReviews(){

    var reviewArr = JSON.parse(localStorage.getItem("reviews"));
    if(reviewArr!=null){

        var reviewCardList = "";
        var userObj = JSON.parse(localStorage.getItem("users"));

        reviewArr.forEach(reviewObj => {
            
            if(reviewObj.lessonId == lessonId){
                
                var reviewCard = `
                    <div class="lesson-comment">
                        <div class="lesson-comment-user-image" style="background-image:url(${userObj[reviewObj.userEmail].image});"></div>
                        <div class="lesson-name-and-comment">
                            <div class="lesson-comment-user-name">${userObj[reviewObj.userEmail].name}</div>
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