"use strict";

let isCorrectNumber = false;


do {
  const inputNumber = +prompt("Введите целое число", "");

  isCorrectNumber = !!inputNumber && inputNumber > 1;

  if (isCorrectNumber) {
    alert(returnPrimeNumbers(inputNumber));
  } else {
    alert("Повторите попытку");
  }
} while (!isCorrectNumber);


function returnPrimeNumbers(number) {
  let result = [];

  for (let i = 2; i <= number; i++) {
    if (isPrimeNumber(i)) result.push(i);
  }

  return result;
}

function isPrimeNumber(number) {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return true;
}
