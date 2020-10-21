"use strict";

let isGameStarted = true;
let message = "";

function returnRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function runGame(randomNumber) {
  let tryCount = 1;

  while (isGameStarted) {
    let helpText = !!message ? "\n" + message : "";
    let userNumber = +prompt(`Введите число от 1 до 100\nПопытка №${tryCount}${helpText}`, '');

    if (!userNumber) return;

    const isWin = getResults(userNumber, randomNumber);

    if (isWin) winGame(tryCount, randomNumber);

    tryCount++;
  }
}

function getResults(userNum, randNum) {
  if (userNum === randNum) return true;
  else if (userNum > randNum) message = "Много";
  else message = "Мало";

  return false;
}

function winGame(tryCount, number) {
  isGameStarted = confirm(
    `Вы Выиграли!!!
  Число = ${number},  
  Попыток = ${tryCount}

Сыграть еще?`
  );

  startGame();
}

function startGame() {
  if (isGameStarted) runGame(returnRandomNumber());
}


startGame();
