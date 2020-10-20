'use strict';

let randomNumber = returnRandomNumber();
let isGameStarted = true;

function returnRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
function runGame() {
let i = 0
  while (i < 10) {
    let userNumber = prompt('Введите число от 1 до 100', '');
    
    if (!!userNumber || userNumber === null) return false;
    
    if (userNumber === randomNumber) {
      winGame();
    } else if (userNumber > randomNumber) {
      console.log('Много');
    } else console.log('Мало');
    
    console.log(randomNumber)
    i++;
  }
}

function winGame() {
  console.log('WIIN');
}

function startGame() {
  if (isGameStarted) {
    runGame();
  }
}
startGame();