'use strict';

const usersData = {
  'serg': 'serg1'
};

let login = prompt('Введите логин', '');
let password;

console.log(isUserRegistered(login, password));

if (usersData[login]) {
  
  while (!isUserRegistered(login, password)) {
    password = prompt('Введите пароль');
  }

}

function isUserRegistered(login, pass) {
  return usersData[login] === pass;
}