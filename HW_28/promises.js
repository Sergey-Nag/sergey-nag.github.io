'use strict';


function getRandomNumberPromise() {
  fetch(URL + "/unstable?maxRandom=20&prob=50")
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.text();
    })
    .then((count) => {
      for (let i = 0; i < +count; i++) console.count("Hello World");
    })
    .catch((error) => console.error(error));
}

function createUserPromise() {
  requestDemoPromise('POST', '/objects', USER_EXAMPLE)
  .then((res) => {
    if (!res.ok) throw res;

    console.log('User created');
    return res.json();
  })
  .then((createdUser)=>{
    return requestDemoPromise('PATCH', `/objects/${createdUser.id}/`, {age:20});
  })
  .then((res)=>{
    if (!res.ok) throw res;

    console.log('User updated');
    return res.json();
  })
  .then((updatedUser)=> {
    return requestDemoPromise('DELETE', `/objects/${updatedUser.id}/`);
  })
  .then((res)=>{
    if (!res.ok) throw res;
    
    console.log('User removed');
  })
  .catch((err)=>{
    console.log(err);
  });
}

function requestDemoPromise(type, query, postData) {
  return fetch(URL + query, {
    method: type,
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  })
  .then((res) => {
    if (!res.ok) return new Error(type +': '+ res.statusText);
    return res;
  })
  .catch((err) => err);
}

// getRandomNumberPromise();