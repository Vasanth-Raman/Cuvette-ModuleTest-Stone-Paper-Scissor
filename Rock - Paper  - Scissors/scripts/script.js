// DOM selection to manipulate HTML
const buttons = document.querySelectorAll(".pick");
const scoreBoard = document.getElementById("score-board");
const playerScoreElement = document.getElementById("playerScore");
const pcScoreElement = document.getElementById("computerScore");
const handSelectionSec =document.getElementById("handSelection");
const gameOutcomeSec = document.getElementById("gameOutcome");
const playAgain = document.getElementById("playAgainBtn");
const against = document.getElementById("against");
const matchResult = document.getElementById("result");
const playerHand = document.getElementById("playerHand");
const pcHand= document.getElementById("pcHand");
const rulesPopup = document.getElementById("rulesPopup");
const victoryPage = document.getElementById("victory-page");
const playAgainWin = document.getElementById("playAgainWinBtn");
const buttonNext =document.getElementById("next");
const buttonRules= document.getElementById("rules");
const buttonRulesWin =document.getElementById("rulesWinBtn");
const buttonClose = document.getElementById("closeBtn");

let userMove= undefined;
let myScore = Number(getMyScore());
let pcScore = Number(getPcScore());


buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        userMove = button.getAttribute("selection");
        winner();
    });
});


playAgain.addEventListener("click", () =>{
    handSelectionSec.style.display="flex";
    gameOutcomeSec.style.display ="none";
    buttonRules.style.visibility="visible";
    buttonNext.style.visibility ="hidden";
    buttonRulesWin.style.visibility="hidden";
});

playAgainWin.addEventListener("click", () =>{
    scoreBoard.style.display ="flex";
    handSelectionSec.style.display ="flex";
    gameOutcomeSec.style.display="none";
    victoryPage.style.display ="none";
});

buttonRules.addEventListener("click", () =>{
    rulesPopup.style.display ="flex";
});
buttonRulesWin.addEventListener("click", () =>{
    rulesPopup.style.display="flex";
});
buttonClose.addEventListener("click", () =>{
    rulesPopup.style.display ="none";
});

buttonNext.addEventListener("click",()=>{
    scoreBoard.style.display ="none";
    handSelectionSec.style.display="none";
    gameOutcomeSec.style.display="none";
    victoryPage.style.display ="flex";
    buttonRules.style.visibility="visible";
    buttonNext.style.visibility="hidden";
    buttonRulesWin.style.visibility="hidden";
    
});

// result making area
function winner(){
    const  pcMove =  randomChoice();
    displayGameResult(playerHand, userMove);
    displayGameResult(pcHand,pcMove);
     // if tie
    if(userMove === pcMove){
        matchResult.innerText = "TIE UP";
        against.style.visibility="hidden";
        playAgain.innerText="REPLAY";
        buttonRules.style.visibility ="visible";
        buttonNext.style.visibility="hidden";
        pcHand.classList.remove("winBg");
        playerHand.classList.remove("winBg");
    } else if(
        (userMove === "paper" && pcMove === "rock") ||
        (userMove === "rock" && pcMove =="scissor") ||
        (userMove === "scissor" && pcMove ==="paper")
    ) {
        // if palyer won
        updateMyScore(1);
        matchResult.innerText ="YOU WIN";
        against.style.visibility="visible";
        playAgain.innerText="PLAY AGAIN";
        buttonNext.style.visibility="visible";
        buttonRules.style.visibility="hidden";
        buttonRulesWin.style.visibility="visible";
        pcHand.classList.remove("winBg");
        playerHand.classList.add("winBg");
    } else {
        // if PC won
        updatePcScore(1);
        matchResult.innerText="YOU LOST";
        against.style.visibility="visible";
        playAgain.innerText="PLAY AGAIN";
        buttonRules.style.visibility="visible";
        buttonNext.style.visibility="hidden";
        pcHand.classList.add("winBg");
        playerHand.classList.remove("winBg");
    }
     
     handSelectionSec.style.display="none";
     gameOutcomeSec.style.display="flex";
}

//Player Score Updation
function updateMyScore(value){
    myScore += value;
    playerScoreElement.innerText = myScore;
    updatePlayerScoreLocalStorage();   
}

//Computer Score Updation
function updatePcScore(value){
    pcScore += value;
    pcScoreElement.innerText =pcScore;
    updateComputerScoreLocalStorage();
}

//Computer to select Random Choice
const choice =["rock","paper","scissor"];

function randomChoice(){
    return choice[Math.floor(Math.random() * choice.length)];
}

// 
function displayGameResult( selected, option) {
    selected.classList.remove("bg-rock");
    selected.classList.remove("bg-paper");
    selected.classList.remove("bg-scissor");
    const image = selected.querySelector("img");
    selected.classList.add(`bg-${option}`);
    image.src =`./assets/${option}.png`;
    image.alt=option;
}

// score to store in local storage area
function updatePlayerScoreLocalStorage() {
    return localStorage.setItem("Player_Score",myScore);
}
function updateComputerScoreLocalStorage() {
    return localStorage.setItem("Computer_Score", pcScore);
}

// Player Score Updation
function getMyScore(){
    const numRegEx = /^-?[\d.]+(?:e-?\d+)?$/;
    let myScore;
    if (
        localStorage.getItem("Player_Score") === null ||
        !localStorage.getItem("Player_Score").match(numRegEx)
    ) {
        localStorage.setItem("Player_Score", "0");
        myScore = "0";
    } else{
        myScore = localStorage.getItem("Player_Score");
        playerScoreElement.innerText = localStorage.getItem("Player_Score");
    }
    return myScore;
}

//computer Score Updation
function  getPcScore(){
    const numRegEx = /^-?[\d.]+(?:e-?\d+)?$/;
    let pcScore;
    if(
        localStorage.getItem("Computer_Score") === null ||
        !localStorage.getItem("Computer_Score").match(numRegEx)
    ) {
        localStorage.setItem("Computer_Score","0");
        pcScore ="0";
    } else  {
        pcScore =localStorage.getItem("Computer_Score");
        pcScoreElement.innerText =  localStorage.getItem("Computer_Score");
    }
     return pcScore;
}
