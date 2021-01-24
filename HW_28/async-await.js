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


// getRandomNumberAsync();

// secondTask();

// thirdTask();


async function getRandomNumberAsync() {
  const resNumber = await requestRandomNumber(20, 50);
  if (!resNumber) return;

  for (let i = 1; i <= +resNumber; i++) console.count("Hello World");
}

async function requestRandomNumber(maxNumber, prob) {
  const reqNumber = await requestDemoAsync(
    "GET",
    `/unstable?maxRandom=${maxNumber}&prob=${prob}`
  );
  return reqNumber?.text();
}



async function secondTask() {
  const errorProb = 20;

  const resCreate = await createUser(USERS_EXAMPLE[0], errorProb);
  if (!resCreate) return;

  console.log("user created", resCreate);

  const resPatch = await updateUserAge(resCreate.id, 33, errorProb);
  if (!resPatch) return;

  console.log("user updated", resPatch);

  const resDelete = await removeUser(resPatch.id, errorProb);
  if (!resDelete) return;

  console.log("user removed");
}

async function createUser(userData, prob) {
  const reqCreate = await requestDemoAsync(
    "POST",
    "/objects?prob=" + prob,
    userData
  );
  return reqCreate?.json();
}

async function updateUserAge(userId, age, prob) {
  const reqPatch = await requestDemoAsync(
    "PATCH",
    `/objects/${userId}?prob=${prob}`,
    { age }
  );

  return reqPatch?.json();
}

async function removeUser(userId, prob) {
  const reqDelete = await requestDemoAsync(
    "DELETE",
    `/objects/${userId}?prob=${prob}`
  );
  return reqDelete?.statusText;
}


async function thirdTask() {
  const errorProb = 5;

  const createdUsersId = USERS_EXAMPLE.map(async (user) => {
    const resCreate = await createUser(user, errorProb);
    if (!resCreate) return;

    return resCreate.id;
  });

  const randomAges = createdUsersId.map(async (id) => {
    const randomAge = await requestRandomNumber(100, errorProb);
    if (!randomAge) return;

    return await +randomAge;
  });

  const updatedUsers = createdUsersId.map(async (userId, i) => {
    const id = await userId;
    const age = await randomAges[i];
    if (!age) return;

    const resUpdate = await updateUserAge(id, age, errorProb);
    if (!resUpdate) return;

    return resUpdate;
  });

  const userNotDelete = await requestRandomNumber(3, errorProb);
  if (!userNotDelete) return;

  for (let i = 0; i < 3; i++) {
    if (i === +userNotDelete) continue;

    const resRemoved = await removeUser(i, errorProb);
    if (!resRemoved) return;

    console.log(`User width id - ${i} removed`);
  }
}

async function requestDemoAsync(type, query, postData) {
  try {
    const req = await fetch(query, {
      method: type,
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });

    if (!req.ok) throw new Error(req.statusText);

    return req;
  } catch (err) {
    console.error(type + " Request " + err);
  }
}
