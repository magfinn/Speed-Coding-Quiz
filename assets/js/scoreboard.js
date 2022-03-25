let clearBtn = document.querySelector('#clear');
let returnBtn = document.querySelector('#return');


let displayScores = function () {
    let highscores = JSON.parse(localStorage.getItem('highscores'));
    highscores.forEach(storedItem => {
        console.log(storedItem);
        let scoreUl = document.querySelector('#scoreUl');
        let newLi = document.createElement('li');
        newLi.textContent = storedItem.user + ' : ' + storedItem.score;
        scoreUl.append(newLi);

    });
}

let clearStorage = () => {
    localStorage.clear();
    displayScores();
}

let redirectQuiz = () => {
    window.location = './index.html'
}

window.addEventListener('load', displayScores);
returnBtn.addEventListener('click', redirectQuiz);
clearBtn.addEventListener('click', clearStorage);


