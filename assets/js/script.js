// set up variables with array/objects for questions:
let questions = [
    {
        question: "Who created one of the first computer languages?",
        choices: ["Albus Dumbledore", "Marie Curie", "Ada Lovelace", "Richard Branson"],
        answer: "Ada Lovelace",
    },
    {
        question: "How many parts make up the grid layout for Bootstrap?",
        choices: ["10", "12", "3", "21"],
        answer: "12",
    },
    {
        question: "How do you comment out HTML?",
        choices: ["#", "//", "<---->", "(comment)"],
        answer: "<---->",
    },
    {
        question: "How do you code 'x is not equal to y' in javascript?",
        choices: ["x,y = 'null'", "x===y", "x!==y", "none of the above",],
        answer: "x!==y",
    },
    {
        question: "How do you exit a for loop in javascript?",
        choices: ["forNope", "stop", "exit", "break"],
        answer: "break",
    }
];
// set up variables
var score = 0;
var currentQuestion = 0;

var timeLeftDiv = document.querySelector("#timeLeft");
var startQuiz = document.querySelector("#startquiz");
var quizArea = document.querySelector("#quizarea");
var questionText = document.querySelector('#question');
var cardFooter = document.querySelector('.card-footer');

var timeLeft = 60;
var holdInterval = 0;
var ulCreate = document.createElement("ul");

//start quiz when start button is clicked
startQuiz.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeLeft--;
            timeLeft.textContent = timeLeft + 'second(s) left';

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                endQuiz();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }

    renderQuestion(currentQuestion);
});

//begin for-loop to display questions and options
function renderQuestion(currentQuestion) {

    cardFooter.innerHTML = ''
    quizArea.innerHTML = "";
    ulCreate.innerHTML = "";
    questionText.innerHTML = '';

    for (var i = 0; i < questions.length; i++) {

        var quizQuestion = questions[currentQuestion].question;
        var quizChoices = questions[currentQuestion].choices;
    }

    quizChoices.forEach(function (newItem) {
        var choiceItem = document.createElement("li");
        choiceItem.textContent = newItem;
        choiceItem.setAttribute("id", "listyle");
        questionText.textContent = quizQuestion;
        quizArea.appendChild(questionText);
        quizArea.appendChild(ulCreate);
        ulCreate.appendChild(choiceItem);
        choiceItem.addEventListener("click", (validateAnswer));
    })
}

//validate the answer
function validateAnswer(event) {
    var element = event.target;
    if (element.matches("li")) {
        if (element.textContent == questions[currentQuestion].answer) {
            score++;
            cardFooter.textContent = "Correct!";
        } else {
            timeLeft = timeLeft - 10;
            cardFooter.textContent = "Try Again!";
            return;
        }
    }
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        renderQuestion(currentQuestion);
    }
    quizArea.appendChild(cardFooter);
}

//once quiz has ended
function endQuiz() {
    quizArea.innerHTML = "";
    timeLeft.innerHTML = "";

    //notify
    var endNotification = document.createElement("h1");
    endNotification.setAttribute("id", "endNotification");
    endNotification.textContent = "Great Job! Don't forget to log your score!"
    quizArea.appendChild(endNotification);
    var endMessage = document.createElement("p");
    endMessage.setAttribute("id", "endMessage");
    quizArea.appendChild(endMessage);
    if (timeLeft >= 0) {
        clearInterval(holdInterval);
        endMessage.textContent = "Your final score is: " + timeLeft;
    }

    //log initials
    var logInitials = document.createElement("label");
    logInitials.textContent = "Enter your initials: ";
    quizArea.appendChild(logInitials);
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("id", "initials");
    initialsInput.textContent = "";
    quizArea.appendChild(initialsInput);

    //submit score
    var submitScoreBtn = document.createElement("button");
    submitScoreBtn.setAttribute("type", "submit");
    submitScoreBtn.setAttribute("id", "submit");
    submitScoreBtn.textContent = "Submit";
    quizArea.appendChild(submitScoreBtn);

    //save to local storage
    submitScoreBtn.addEventListener("click", function () {
        var initials = initialsInput.value;
        var finalScore = {
            initials: initials,
            score: timeLeft
        }

        // get all scores from local storage
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);

        //redirect to scoreboard
        window.location.replace("./highscore.html");
    });

};
