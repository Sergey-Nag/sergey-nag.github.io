"use strict";

const usersData = {
  admin: {
    password: "administrator",
    isLogined: false,
  },
  serg: {
    password: "serg1",
    isLogined: false,
  },
};

auth();

function auth() {
  const login = prompt("Введите логин", "");

  if (!login) return;

  if (usersData[login]) loginUser(login);
  else createUser(login);

  if (usersData[login]?.isLogined) alert(`Добро пожаловать ${login}`);
}

function loginUser(login) {
  let pass = askPassword(login);

  if (pass) usersData[login].isLogined = true;
}


function createUser(login) {
  const isRegistering = confirm(`Пользователя с именем ${login} еще не существует, хотите зарегистрироваться?`);

  if (!isRegistering) return;

  let pass = "";
  while (pass === "" && pass !== null) pass = prompt("Введите пароль", "");

  if (pass) {
    usersData[login] = { password: pass, isLogined: false};
   
    const isAuth = confirm('Хотите залогиниться?');
    
    if(isAuth) loginUser(login);
  }
}

function askPassword(login) {
  let message = "";
  while (true) {
    let pass = prompt(message + "Введите пароль", "");

    if (pass === null) return;

    if (isPasswordCorrect(login, pass)) return pass;
    else message = "Пароль неверный\n";
  }
}

function isPasswordCorrect(login, pass) {
  return usersData[login]?.password === pass;
}
