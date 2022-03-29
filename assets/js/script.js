
//variables for quiz
var currentQuestion = 0;
let answers = [];
var timeLeftDiv = document.querySelector("#timeLeft");
var resultsDiv = document.querySelector('#resultsDiv');
var startBtn = document.querySelector("#start-btn");
var quizArea = document.querySelector("#quizarea");
var questionText = document.querySelector('#question');
var cardFooter = document.querySelector('.card-footer');
var timeLeft = 60;

//questions array
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


//start quiz
function beginQuiz() {
    let welcomeText = document.querySelector('#welcome');
    let emphasis = document.querySelector('#emphasis');
    welcomeText.innerHTML = '';
    emphasis.innerHTML = '';
    startBtn.style.display = 'none';
    //set the timer function
    let setTimer = () => {
        let timer = setInterval(function () {
            timeLeftDiv.textContent = timeLeft + ' second(s) left';
            timeLeft -= 1;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    };
    setTimer();
    renderQuestion(questions[currentQuestion]);
}

//display questions
function renderQuestion() {

    let question = questions[currentQuestion].question;
    let questionText = document.createElement('p');

    questionText.textContent = question;
    questionText.setAttribute('class', 'p-4 is-text-centered')
    quizArea.append(questionText);

    questions[currentQuestion].answers.forEach((answer) => {
        let answerBtn = document.createElement('button');
        answerBtn.textContent = answer
        answerBtn.setAttribute('value', answer)
        answerBtn.setAttribute('class', 'options');
        let choiceList = document.createElement('ul');
        choiceList.setAttribute('class', 'options-ul');
        choiceList.append(answerBtn);
        quizArea.append(choiceList);

        answerBtn.addEventListener('click', validateAnswer)
    })
}

//check to see whether the button selected mataches the answer on the object
function validateAnswer(event) {
    if (event.target.value === questions[currentQuestion].answer) {
        cardFooter.innerHTML = 'Correct!';
        quizArea.innerHTML = '';
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

//if timeLeft =0 or end of question array length, end quiz
function endQuiz() {
    //clear questions
    quizArea.innerHTML = "";
    //clear timer
    timeLeftDiv.innerHTML = "";
    let cardHeader = document.querySelector('.card-header');
    cardHeader.innerHTML = ''
    //set score to timeleft
    let score = timeLeft;
    //add a message to save score
    let logScoreMessage = document.createElement('p');
    logScoreMessage.innerHTML = 'Great Job! You scored ' + score + ' points!';
    cardFooter.innerHTML = 'Enter your initials to log your score!'
    quizArea.append(logScoreMessage);
    quizArea.append(cardFooter);
    let userDiv = document.createElement('div');
    quizArea.append(userDiv);
    //add fields to enter name 
    let userInput = document.createElement('input');
    userInput.setAttribute('label', 'Enter your initials');
    userDiv.append(userInput);
    //save score and name
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
        window.location.replace('./scoreboard.html');
    })

};

//start quiz
startBtn.addEventListener('click', beginQuiz);