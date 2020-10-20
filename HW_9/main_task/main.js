"use strict";

let randomNumber = returnRandomNumber();
let isGameStarted = true;

function returnRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
function runGame() {
  let tryCount = 1;
  while (tryCount < 10) {
    let userNumber = +prompt(
      `Введите число от 1 до 100\nПопытка №${tryCount}`,
      ""
    );

    if (!userNumber) return;

    const isWin = compareNumbers(userNumber, randomNumber);

    if (isWin) winGame();

    console.log(randomNumber);
    tryCount++;
  }
}

function compareNumbers(userNum, randNum) {
  if (userNum === randNum) return true;
  else if (userNum > randNum) console.log("Много");
  else console.log("Мало");

  return false;
}

function winGame() {
  console.log("WIIN");
  isGameStarted = false;
}

function startGame() {
  if (isGameStarted) {
    runGame();
  }
}
startGame();
