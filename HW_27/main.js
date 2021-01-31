"use strict";
    
// №1 Random Number
sendRequest('GET', '/unstable?maxRandom=20&prob=50', {}, (err, res)=>{
  if (err) {
      console.error(err);
      return;
  }

  const num = +res;
  console.log(num)
  
  for (let i = 0; i < num; i++) console.count('Hello World');
});


// №2 Create & update user
const USER = { firstName: "Vasya", lastName: "Ivanov" };
const HEADERS = {
  "Content-type": "application/json; charset=utf-8",
};

sendRequest("POST", "https://async-demo.herokuapp.com/objects?prob=20", {
    body: USER,
    headers: HEADERS,
  }, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    const { id } = JSON.parse(res);
    console.log("User created with id " + id);

    sendRequest("PATCH", `https://async-demo.herokuapp.com/objects/${id}?prob=20`, {
        body: { age: 33 },
        headers: HEADERS,
      }, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log("DONE", JSON.parse(res));
      }
    );
  }
);


function sendRequest(method, url, { body, headers = {} } = {}, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.addEventListener("load", () => {
    if (xhr.status >= 400) {
      callback(xhr.response);
    } else {
      callback(null, xhr.response);
    }
  });

  xhr.send(JSON.stringify(body));
}
