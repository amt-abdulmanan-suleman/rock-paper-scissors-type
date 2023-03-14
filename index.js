const ruleBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");
const rulesModal = document.querySelector('.rules');
const choices = document.querySelectorAll('.circle');
const computerDivs = document.querySelectorAll('.computer')
const gameSection = document.querySelector('.game-section')
const result = document.querySelector(".pre-step-2")
const picks = document.querySelectorAll('.picks')

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
}

function aiChoice(){
    const randIndex = Math.floor(Math.random()*WAR.length)
    return WAR[randIndex]
}

function displayResult(results){
    computerDivs.forEach((computerDiv,index)=>{
        setTimeout(()=>{
            computerDiv.classList.remove('computer')
            computerDiv.innerHTML = `<div class="pre-step-2-circle pre-step-2-circle-${results[index].name}">
            <div class="pre-step-2-inner-circle"><img src="./images/icon-${results[index].name}.svg" alt="${results[index].name}" ></div>
          </div>`
        },index*1000)
    })
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide")
}

// function displayResult(results){
//     results.forEach((result,index)=>{
//         setTimeout(()=>{

//         },index*1000)
//     })
// }