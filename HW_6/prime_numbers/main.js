'use strict';

let isCorrectNumber = false;

do {

    const inputNumber = +prompt('Введите целое число', '');

    isCorrectNumber = !!inputNumber && inputNumber > 0;

    if (isCorrectNumber) {
        alert(!!inputNumber && returnPrimeNumbers(inputNumber));
    } else {
        alert('Повторите попытку');
    }

} while (!isCorrectNumber);


function returnPrimeNumbers(number) {
    let result = [];

    for (let i = 0; i < number; i++) {
        if (i % 2 == 0) result.push(i);
    }

    return result;
}