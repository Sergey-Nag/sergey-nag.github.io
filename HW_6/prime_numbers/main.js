'use strict';

const inputNumber = +prompt('Введите целое число', '');



alert(!!inputNumber && returnPrimeNumbers(inputNumber));

function returnPrimeNumbers(number) {
    let result = [];

    for (let i = 0; i < number; i++) {
        if (i % 2 == 0) result.push(i);
    }

    return result;
}