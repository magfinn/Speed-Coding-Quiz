let questions = [
    {
        question: "Who created one of the first computer languages?",
        answers: ["Albus Dumbledore", "Marie Curie", "Ada Lovelace", "Richard Branson"],
        answer: "Ada Lovelace",
    },
    {
        question: "How many parts make up the grid layout for Bootstrap?",
        answers: ["10", "12", "3", "21"],
        answer: "12",
    },
    {
        question: "How do you comment out HTML?",
        answers: ["#", "//", "<---->", "(comment)"],
        answer: "<---->",
    },
    {
        question: "How do you code 'x is not equal to y' in javascript?",
        answers: ["x,y = 'null'", "x===y", "x!==y", "none of the above",],
        answer: "x!==y",
    },
    {
        question: "How do you exit a for loop in javascript?",
        answers: ["forNope", "stop", "exit", "break"],
        answer: "break",
    }
];

var currentQuestion = 0;
let answers = [];

var timeLeftDiv = document.querySelector("#timeLeft");
var resultsDiv = document.querySelector('#resultsDiv');
var startBtn = document.querySelector("#start-btn");
var quizArea = document.querySelector("#quizarea");
var questionText = document.querySelector('#question');
var cardFooter = document.querySelector('.card-footer');

var timeLeft = 60;

function setTimer() {
    let timer = setInterval(function () {
        timeLeftDiv.textContent = timeLeft + ' second(s) left';
        timeLeft -= 1;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
};

function beginQuiz() {
    let welcomeText = document.querySelector('#welcome');
    let emphasis = document.querySelector('#emphasis');
    welcomeText.innerHTML = '';
    emphasis.innerHTML = '';
    startBtn.style.display = 'none';
    renderQuestion(questions[currentQuestion]);
}


function renderQuestion() {

    let question = questions[currentQuestion].question;
    let questionText = document.createElement('h3');

    questionText.textContent = question;
    quizArea.append(questionText);

    questions[currentQuestion].answers.forEach((answer) => {
        let answerBtn = document.createElement('button');
        answerBtn.textContent = answer
        answerBtn.setAttribute('value', answer)
        let choiceList = document.createElement('ul');
        choiceList.append(answerBtn);
        quizArea.append(choiceList);

        answerBtn.addEventListener('click', validateAnswer)
    })
}

function validateAnswer(event) {
    if (event.target.value === questions[currentQuestion].answer) {
        cardFooter.innerHTML = 'Correct!';
        currentQuestion++
    } else {
        timeLeft = timeLeft - 10;
        if (timeLeft <= 0) {
            endQuiz();
        }
        cardFooter.innerHTML = 'Try Again!'
        timeLeftDiv.innerHTML = timeLeft + 'second(s) left'
        return;
    }
    if (currentQuestion < questions.length) {
        renderQuestion(questions[currentQuestion]);
    } else {
        endQuiz();

    }
};

function endQuiz() {
    quizArea.innerHTML = "";
    timeLeft.innerHTML = "";
    let score = timeLeft;
    let logScoreMessage = document.createElement('p');
    logScoreMessage.innerHTML = 'Great Job! Enter your initials to log your score!';
    cardFooter.innerHTML = 'Your score is ' + score;
    quizArea.append(logScoreMessage);
    quizArea.append(cardFooter);

    let userDiv = document.createElement('div');
    quizArea.append(userDiv);

    let userInput = document.createElement('input');
    userInput.setAttribute('label', 'Enter your initials');
    userDiv.append(userInput);

    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Submit';
    saveBtn.setAttribute('type', 'submit');
    userDiv.append(saveBtn);
    saveBtn.addEventListener('click', function () {
        let username = userInput.value;
        console.log(username);
        let score = timeLeft;
        let savedScore = {
            user: username,
            score: score
        }

        let highscores = localStorage.getItem('highscores');
        if (!highscores) {
            highscores = [];
        } else {
            highscores = JSON.parse(highscores);
        }

        highscores.push(savedScore);
        let scoreboard = JSON.stringify(highscores);
        localStorage.setItem('highscores', scoreboard);
        window.location.replace('./highscore.html');
    })

};

startBtn.addEventListener('click', beginQuiz);