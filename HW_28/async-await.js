"use strict";



async function getRandomNumberAsync() {
  try {
    const request = await fetch(URL + "/unstable?maxRandom=20&prob=50");

    if (!request.ok) throw new Error(request.statusText);

    const response = await request.text();
    for (let i = 1; i <= +response; i++) console.count("Hello World");
  } catch (e) {
    console.error("ОШИБКА:", e);
  }
}

async function createUserAsync() {
  const reqCreate = await requestDemoAsync("POST", "/objects?prob=20", USER_EXAMPLE);
  if (!reqCreate) return;

  const resCreate = await reqCreate.json();
  console.log(reqCreate.statusText, resCreate);

  const reqPatch = await requestDemoAsync("PATCH", `/objects/${resCreate.id}/?prob=20`, { age: 20 });
  if (!reqPatch) return;

  const resPatch = await reqPatch.json();
  console.log(reqPatch.statusText, resPatch);

  const reqDelete = await requestDemoAsync("DELETE", `/objects/${resCreate.id}/?prob=20`);
  if (!reqDelete) return;

  console.log(reqDelete.statusText);
    
}

async function requestDemoAsync(type, query, postData) {
  try {
    const req = await fetch(URL + query, {
      method: type,
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });

    if (!req.ok) return new Error(type, req.statusText);

    return req;
  } catch (error) {
    console.error(error)
  }
}



// getRandomNumberAsync();

createUserAsync();
