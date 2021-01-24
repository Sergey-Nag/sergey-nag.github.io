(() => {
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


  function getRandomNumberPromise() {
    requestRandomNumber(20, 50)
      .then((resNumber) => {
        if (!resNumber) throw new Error("number wasn't generated");

        for (let i = 1; i <= +resNumber; i++) console.count("Hello World");
      })
      .catch(handleError);
  }

  function requestRandomNumber(maxNumber, prob) {
    return requestDemoPromise("GET", `/unstable?maxRandom=${maxNumber}&prob=${prob}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        return res.text();
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

  function createUser(userData, prob) {
    return requestDemoPromise("POST", "/objects?prob=" + prob, userData)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        console.log("User created");
        return res.json();
      });
  }

  function updateUserAge(userId, age, prob) {
    return requestDemoPromise(
      "PATCH",
      `/objects/${userId}/?prob=${prob}`,
      {age}
    )
    .then((res) => {
      if (!res.ok) throw new Error(res.status);

      console.log("User age updated");
      return res.json();
    });
  }

  function removeUser(userId, prob) {
    return requestDemoPromise("DELETE", `/objects/${userId}?prob=${prob}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        console.log("User removed");
      });
  }


  function thirdTask() {
    const errorProb = 0;

    Promise.all(USERS_EXAMPLE.map((userData)=>{
      return createUser(userData, errorProb);
    }))
    .then((res)=>{
      return res.map((user)=>{
        return requestRandomNumber(100, errorProb);
      });
    })
    .then((res)=>{
      console.log(res);
    })
    .catch(handleError);
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
      if (!res.ok) return new Error(type + ": " + res.statusText);
      return res;
    })
    .catch((err) => console.log(type + " Request " + err));
  }

  function handleError(err) {
    console.error(err);
  }

  
})();
