'use strict';

/*
    ПРИМЕР №1
    Конструкция if
*/
const isWannaBear;

let message = '';

if (isWannaBear) {
    message = "Пиво в холодильнике.";
} else {
    message = "Тогда возьмите молоко.";
}


/*
    ПРИМЕР №1
    Тернарный оператор
*/
const message = isWannaBear ? "Пиво в холодильнике" : "Тогда возьмите молоко.";


/*
====================================================================================

    ПРИМЕР №2
    Конструкция if
*/
const age = 36;

let message = '';

if (age > 30) {
    message = 'Добрый день';
} else if (age >= 18) {
    message = 'Здарова';
} else {
    message = 'Вам запрещено';
}


/*
    ПРИМЕР №2
    Тернарный оператор
*/
const message = (age > 30) ? 'Добрый день' :
                (age >= 18) ? 'Здарова' :
                'Вам запрещено';


/*
====================================================================================

    ПРИМЕР №3
    Конструкция if
*/
const teaOrCoffee;
const isSugar;

let message = '';

if (teaOrCoffee === 'Чай' && isSugar) {
    message = 'Чай с сахаром';
} else if (teaOrCoffee === 'Чай' && !isSugar) {
    message = 'Чай без сахара';
} else if (teaOrCoffee === 'Кофе' && isSugar) {
    message = 'Кофе с сахаром';
} else {
    message = 'Кофе без сахара';
}


/*
    ПРИМЕР №3
    Тернарный оператор
*/
const message = (teaOrCoffee === 'Чай' && isSugar) ? 'Чай с сахаром':
                (teaOrCoffee === 'Чай' && !isSugar) ? 'Чай без сахара' :
                (teaOrCoffee === 'Кофе' && isSugar) ? 'Кофе с сахаром' :
                'Кофе без сахара';
