var score = Number(localStorage.getItem('score')) || 0;
var ruleBtn = document.querySelector(".rules-btn");
var closeBtn = document.querySelector(".close-btn");
var rulesModal = document.querySelector('.rules');
var choices = document.querySelectorAll('.circle');
var computerDivs = document.querySelectorAll('.computer');
var gameSection = document.querySelector('.game-section');
var result = document.querySelector(".pre-step-2");
var picks = document.querySelectorAll('.picks');
var resultText = document.querySelector('.result-text');
var showResult = document.querySelector('.result');
var shadow = document.querySelectorAll('.shade');
var playAgain = document.querySelector('.result-btn');
var scoreText = document.querySelector('.score');
scoreText.innerHTML = score.toString();
var WAR = [
    {
        name: "scissors",
        beats: ["lizard", "paper"]
    },
    {
        name: "paper",
        beats: ["rock", "spock"]
    },
    {
        name: "rock",
        beats: ["lizard", "scissors"]
    },
    {
        name: "lizard",
        beats: ["spock", "paper"]
    },
    {
        name: "spock",
        beats: ["scissors", "rock"]
    },
];
ruleBtn.addEventListener("click", function () {
    rulesModal.classList.toggle("hide");
});
closeBtn.addEventListener("click", function () {
    rulesModal.classList.toggle("hide");
});
choices.forEach(function (choice) {
    choice.addEventListener("click", function () {
        var choose = choice.classList[1];
        var choices = WAR.find(function (war) { return war.name === choose; });
        move(choices);
    });
});
function move(choices) {
    var aiChoose = aiChoice();
    console.log(choices, aiChoose);
    displayResult([choices, aiChoose]);
    winnerOrLoser([choices, aiChoose]);
}
function aiChoice() {
    var randIndex = Math.floor(Math.random() * WAR.length);
    return WAR[randIndex];
}
function displayResult(results) {
    computerDivs.forEach(function (computerDiv, index) {
        // setTimeout(()=>{
        computerDiv.classList.remove("computer");
        computerDiv.innerHTML = "<div class=\"pre-step-2-circle pre-step-2-circle-".concat(results[index].name, "\">\n              <div class=\"pre-step-2-inner-circle\"><img src=\"./images/icon-").concat(results[index].name, ".svg\" alt=\"").concat(results[index].name, "\" ></div>\n            </div>");
        // },index*1000)
    });
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
}
function winnerOrLoser(results) {
    setTimeout(function () {
        var userWinner = isWinner(results);
        var aiWinner = isWinner(results.reverse());
        if (userWinner) {
            resultText.innerHTML = "You Win";
            shadow[0].classList.toggle("shadow");
            score++;
            localStorage.setItem("score", String(score));
            scoreText.innerHTML = String(score);
        }
        else if (aiWinner) {
            resultText.innerHTML = "You Lose";
            shadow[1].classList.toggle("shadow");
            score--;
            localStorage.setItem("score", String(score));
            scoreText.innerHTML = String(score);
        }
        else {
            resultText.innerHTML = "Draw";
        }
        showResult.classList.toggle("hide");
    }, 1000);
}
function isWinner(results) {
    return results[0].beats.includes(results[1].name);
}
playAgain.addEventListener('click', function () {
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
    computerDivs.forEach(function (computerDiv) {
        computerDiv.innerHTML = "";
        computerDiv.classList.remove('shadow');
        computerDiv.classList.add('computer');
    });
    resultText.innerHTML = "";
    showResult.classList.toggle('hide');
});
