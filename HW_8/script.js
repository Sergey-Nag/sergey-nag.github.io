"use strict";

// 1. Функция pow(a, b), которая возводит a в степень b. Оператор ** и Math.pow не использовать.
function pow(a, b) {
  let result = a;
  for (let i = 1; i < b; i++) result *= a;
  return result;
}


// 2. Функция createUser(firstName, lastName, age), которая принимает имя, фамилию и возраст, а возвращает объект вида {firstName, lastName, age}. Если один из параметров не задан - свойство принимает значение null.
function createUser(firstName = null, lastName = null, age = null) {
  return {firstName, lastName, age}
}


// 3.Напишите функцию, которая принимает число и две другие функции. Если число меньше 100 - вызывается первая функция. Если больше - вторая.
function moreLess(number, more, less) {
  if (number > 100) more();
  else less();
}
