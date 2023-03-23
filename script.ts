let score : number = Number(localStorage.getItem('score')) || 0;

const ruleBtn : HTMLButtonElement = document.querySelector(".rules-btn")!;
const closeBtn : HTMLButtonElement= document.querySelector(".close-btn")!;
const rulesModal : HTMLElement = document.querySelector('.rules')!;
const choices : NodeListOf<Element> = document.querySelectorAll('.circle');
const computerDivs: NodeListOf<Element> = document.querySelectorAll('.computer');
const gameSection : HTMLElement = document.querySelector('.game-section')!;
const result : HTMLElement= document.querySelector(".pre-step-2")!;
const picks: NodeListOf<Element> = document.querySelectorAll('.picks');
const resultText : HTMLElement = document.querySelector('.result-text')!;
const showResult : HTMLElement = document.querySelector('.result')!;
const shadow: NodeListOf<Element> = document.querySelectorAll('.shade');
const playAgain : HTMLButtonElement = document.querySelector('.result-btn')!;
const scoreText : HTMLElement = document.querySelector('.score')!;

scoreText.innerHTML = score.toString()

type WarChoice = {
    name: string;
    beats: string[];
  }
  
  const WAR: WarChoice[] = [
    {
      name: "scissors",
      beats: ["lizard", "paper"],
    },
    {
      name: "paper",
      beats: ["rock", "spock"],
    },
    {
      name: "rock",
      beats: ["lizard", "scissors"],
    },
    {
      name: "lizard",
      beats: ["spock", "paper"],
    },
    {
      name: "spock",
      beats: ["scissors", "rock"],
    },
  ];
  
  ruleBtn.addEventListener("click", () => {
    rulesModal.classList.toggle("hide");
  });
  
  closeBtn.addEventListener("click", () => {
    rulesModal.classList.toggle("hide");
  });
  
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const choose = choice.classList[1];
      const choices = WAR.find((war) => war.name === choose)!;
      move(choices);
    });
  });
  
  function move(choices: WarChoice) {
    const aiChoose = aiChoice();
    console.log(choices, aiChoose);
    displayResult([choices, aiChoose]);
    winnerOrLoser([choices, aiChoose]);
  }
  
  function aiChoice(): WarChoice {
    const randIndex = Math.floor(Math.random() * WAR.length);
    return WAR[randIndex];
  }
  
  function displayResult(results: WarChoice[]) {
    computerDivs.forEach((computerDiv, index) => {
      // setTimeout(()=>{
      computerDiv.classList.remove("computer");
      computerDiv.innerHTML = `<div class="pre-step-2-circle pre-step-2-circle-${results[index].name}">
              <div class="pre-step-2-inner-circle"><img src="./images/icon-${results[index].name}.svg" alt="${results[index].name}" ></div>
            </div>`;
      // },index*1000)
    });
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
  }
  
  function winnerOrLoser(results: WarChoice[]) {
    setTimeout(() => {
      const userWinner = isWinner(results);
      const aiWinner = isWinner(results.reverse());
      if (userWinner) {
        resultText.innerHTML = "You Win";
        shadow[0].classList.toggle("shadow");
        score++;
        localStorage.setItem("score", String(score));
        scoreText.innerHTML = String(score);
      } else if (aiWinner) {
        resultText.innerHTML = "You Lose";
        shadow[1].classList.toggle("shadow");
        score--;
        localStorage.setItem("score", String(score));
        scoreText.innerHTML = String(score);
      } else {
        resultText.innerHTML = "Draw";
      }
      showResult.classList.toggle("hide");
    }, 1000);
  }
  
  function isWinner(results: WarChoice[]): boolean {
    return results[0].beats.includes(results[1].name);
  }
  
playAgain.addEventListener('click',() => {
    gameSection.classList.toggle("hide");
    result.classList.toggle("hide");
    computerDivs.forEach((computerDiv) => {
        computerDiv.innerHTML = "";
        computerDiv.classList.remove('shadow')
        computerDiv.classList.add('computer')
    })
    resultText.innerHTML = ""
    showResult.classList.toggle('hide')
})
  