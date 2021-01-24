"use strict";

const USERS_EXAMPLE = [
  {
    firstName: "Vasya",
    lastName: "Ivanov",
  },
  {
    firstName: "Ivan",
    lastName: "Vasiliev",
  },
  {
    firstName: "Ivas",
    lastName: "Vasolyov",
  },
];

// getRandomNumberPromise();

// secondTask();

// thirdTask();


function getRandomNumberPromise() {
  requestRandomNumber(20, 50)
    .then((resNumber) => {
      if (!resNumber) throw new Error("number wasn't generated");

      for (let i = 1; i <= +resNumber; i++) console.count("Hello World");
    })
    .catch(handleError);
}

function requestRandomNumber(maxNumber, prob) {
  return requestDemoPromise(
    "GET",
    `/stable?maxRandom=${maxNumber}&prob=${prob}`
  )
    .then((res) => {
      if (!res) throw new Error("Error max number");

      return res.text();
    })
    .catch(handleError);
}

function createUser(userData, prob) {
  return requestDemoPromise("POST", "/objects?prob="+prob, userData).then((res) => {
    if (!res) throw new Error("Error create user");

    console.log("User created");
    return res.json();
  });
}


function secondTask() {
  const errorProb = 0;

  createUser(USERS_EXAMPLE[0], errorProb)
    .then((createdUser) => {
      if (!createdUser) throw new Error("user wasn't created");
      return updateUserAge(createdUser.id, 33, errorProb);
    })
    .then((updatedUser) => {
      if (!updatedUser) throw new Error("user's age wasn't updated");
      return removeUser(updatedUser.id, errorProb);
    })
    .catch(handleError);
}

function removeUser(userId, prob) {
  return requestDemoPromise("DELETE", `/objects/${userId}?prob=${prob}`)
    .then((res) => {
      if (!res) throw new Error("Error remove user");

      console.log("User removed");
    });
}

function updateUserAge(userId, age, prob) {
  return requestDemoPromise("PATCH", `/objects/${userId}/?prob=${prob}`, {age})
  .then((res) => {
    if (!res) throw new Error("Error update age");

    console.log("User age updated");
    return res.json();
  });
}


function thirdTask() {
  const errorProb = 5;
  let usersId = [];

  Promise.all(USERS_EXAMPLE.map((userData) => {
    return createUser(userData, errorProb);
  }))
    .then((res) => {
      if (!res) throw new Error("Create User Error");

      usersId = res.map((el) => el.id);

      return getRandomAges(errorProb);
    })
    .then((ages) => {
      if (!ages) throw new Error("Create Random Ages Error");

      return usersId.map((id, i) => {
        return updateUserAge(id, ages[i], errorProb);
      });
    })
    .then((res) => {
      if (!res) throw new Error("Update User's Age Error");

      return requestRandomNumber(3, errorProb);
    })
    .then((randId) => {
      if (!randId) throw new Error("Random Number ID Error");

      for (let i = 0; i < 3; i++) {
        if (randId === i) continue;

        removeUser(usersId[i], errorProb);
      }
    })
    .catch(handleError);
}

function getRandomAges(prob) {
  return Promise.all(
    USERS_EXAMPLE.map((el) => {
      return requestRandomNumber(100, prob);
    })
  );
}


function requestDemoPromise(type, query, postData) {
  return fetch(query, {
    method: type,
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      if (!res.ok) throw new Error(type + ": " + res.statusText);
      return res;
    })
    .catch(handleError);
}

function handleError(err) {
  console.error(err);
}