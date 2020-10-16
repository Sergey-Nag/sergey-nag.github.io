"use strict";

const index = +prompt("Введите порядковый номер числа из ряда Фибоначчи", "");

alert(returnFibonacciNumber(index));

function returnFibonacciNumber(number) {
  let result = 0;
  let lastResult = 1;
  let preLastResult = 1;

  if (number > 2) {
    for (let i = 2; i < number; i++) {
      result = lastResult + preLastResult;
      preLastResult = lastResult;
      lastResult = result;
    }
  } else if (number === 0) {
    return 0;
  } else {
    return 1;
  }

  return result;
}
