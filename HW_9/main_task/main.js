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

    if (isWin(userNumber, randomNumber)) {
      winGame(tryCount, randomNumber);
      break;
    } else {
      tryCount++;
    }
  }
}

function isWin(userNum, randNum) {
  if (userNum === randNum) return true;
  else if (userNum > randNum) message = "Много";
  else message = "Мало";

  return false;
}

function winGame(tryCount, number) {
  message = "";

  isGameStarted = confirm(
    `Вы Выиграли!!!

Угаданное число = ${number}
Попыток = ${tryCount}

Сыграть еще?`
  );

  startGame();
}

function startGame() {
  if (isGameStarted) runGame(returnRandomNumber());
}


startGame();
