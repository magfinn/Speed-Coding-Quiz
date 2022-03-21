// set variables 
var highScore = document.querySelector("#highscore");
var clearHighScore = document.querySelector("#clearhighscore");
var goBackQuiz = document.querySelector("#gobackquiz");

// add event listener to clear high scores:
clearHighScore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retreives data from local storage:
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// add event listener to Go Back button (main home page):
goBackQuiz.addEventListener("click", function () {
    window.location.replace("./index.html");
});