"use strict";

const CORRECT_LOGIN = "Admin";
const CORRECT_PASSWORD = "administrator";

const login = prompt("Введите Логин", "");

let password = "";
let isRepeatPassword = true;

while (isRepeatPassword) {
  password = prompt("Введите Пароль", "");

  if (login === CORRECT_LOGIN && password === CORRECT_PASSWORD) {
    alert("Добро пожаловать, " + login);
    break;
  } else if (login === CORRECT_LOGIN) {
    isRepeatPassword = confirm("Пароль неверный!!! Повторить попытку?");
  } else {
    alert("Логин неверный");
    break;
  }

  if (!isRepeatPassword) {
    alert("Пароль неверный");
  }
}
