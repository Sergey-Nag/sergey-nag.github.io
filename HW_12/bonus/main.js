'use strict';

const usersData = {
  'serg': {
    isLogined: false,
    password: 'serg1'
  }
};

let login = prompt('Введите логин', '');
console.log(signIn(login, ''));

if (usersData[login] && !usersData[login].isLogined) {
  
  let isUserExist = askAndCheckPassword(login);

  if (isUserExist) authUser(login);

} else {
  let isRegisterign = confirm(`Пользователя с именем ${login} еще не существует, хотите зарегистрироваться?`);

  if (isRegisterign) {
    let password = prompt('Введите пароль', '');

  }
}

function authUser(login) {
  usersData[login].isLogined = true;
}

function askAndCheckPassword(login) {
  while (true) {
    let pass = prompt('Введите пароль', '');
    if (signIn(login, pass)) return true;
  }
}

function signIn(login, pass) {
  return usersData[login]?.password === pass;
}