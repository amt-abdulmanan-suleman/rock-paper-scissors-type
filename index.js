let score = localStorage.getItem('score') || 0

const ruleBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");
const rulesModal = document.querySelector('.rules');
const choices = document.querySelectorAll('.circle');
const computerDivs = document.querySelectorAll('.computer')
const gameSection = document.querySelector('.game-section')
const result = document.querySelector(".pre-step-2")
const picks = document.querySelectorAll('.picks');
const resultText = document.querySelector('.result-text')
const showResult = document.querySelector('.result')
const shadow = document.querySelectorAll('.shade')
const playAgain = document.querySelector('.result-btn')
const scoreText = document.querySelector('.score')
scoreText.innerHTML = score

console.log(score)
const WAR = [
    {
        name: "scissors",
        beats:["lizard","paper"]
    },
    {
        name:"paper",
        beats:["rock","spock"]
    },
    {
        name:"rock",
        beats:["lizard","scissors"]
    },
    {
        name:"lizard",
        beats:["spock","paper"]
    },
    {
        name:"spock",
        beats:["scissors","rock"]
    }
]

ruleBtn.addEventListener('click',()=>{
    rulesModal.classList.toggle('hide')
})
closeBtn.addEventListener('click',()=>{
    rulesModal.classList.toggle('hide')
})

choices.forEach((choice)=>{
    choice.addEventListener('click',()=>{
        const choose = choice.classList[1];
        const choices = WAR.find((wars)=>wars.name===choose);
        move(choices)
    })
})

function move(choices){
    const aiChoose = aiChoice();
    console.log(choices,aiChoose)
    displayResult([choices,aiChoose]);
    winnerOrLoser([choices,aiChoose])
}

function aiChoice(){
    const randIndex = Math.floor(Math.random()*WAR.length)
    return WAR[randIndex]
}

function displayResult(results){
    computerDivs.forEach((computerDiv,index)=>{
        // setTimeout(()=>{
            computerDiv.classList.remove('computer')
            computerDiv.innerHTML = `<div class="pre-step-2-circle pre-step-2-circle-${results[index].name}">
            <div class="pre-step-2-inner-circle"><img src="./images/icon-${results[index].name}.svg" alt="${results[index].name}" ></div>
          </div>`
        // },index*1000)
    })
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
}
function winnerOrLoser(results){
    setTimeout(()=>{
        const userWinner = isWinner(results);
        const aiWinner = isWinner(results.reverse());
        if(userWinner){
            resultText.innerHTML = 'You Win'
            shadow[0].classList.toggle('shadow')
            score++;
            localStorage.setItem('score',score)
            scoreText.innerHTML= score
        }else if(aiWinner){
            resultText.innerHTML = 'You Lose'
            shadow[1].classList.toggle('shadow');
            score--;
            localStorage.setItem('score',score)
            scoreText.innerHTML=score
        }else{
            resultText.innerHTML = 'Draw'
        }
        showResult.classList.toggle('hide')
    },1000);
    
}

function isWinner(results){
    return results[0].beats.includes(results[1].name)
}

playAgain.addEventListener('click',function(){
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
    computerDivs.forEach((computerDiv)=>{
        computerDiv.innerHTML = "";
        computerDiv.classList.remove('shadow')
        computerDiv.classList.add('computer')
    })
    resultText.innerHTML = ""
    showResult.classList.toggle('hide')
})
