'use strict';

const greetingList = ['Добрый день', 'Приветствую', 'Здарова'];

let userName = prompt('Как Вас зовут?', '');
let userLastName = prompt('Какая Ваша фамилия?', '');
let userAge = prompt('Сколько Вам лет?', '');


alert(returnGreeting(userName, userLastName, userAge));


function returnGreeting(name, lastName, age) {
    name = (name != null && name != '') ? name.toUpperCase() : 'юзернейм';
    lastName = (name != null && lastName != '')? ' '+lastName[0].toUpperCase()+'.' : '';
    let birthYear = (age != null && age != '')? ', '+(new Date().getFullYear() - Number.parseInt(age)) + ' года рождения' : '';

    return greetingList[randomIndex(0, 2)] + ', ' + name + lastName + birthYear;
}

function randomIndex(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}