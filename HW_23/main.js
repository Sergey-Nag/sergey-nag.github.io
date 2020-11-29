function deepClone(obj, newObj = {}) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      newObj[key] = deepClone(
        obj[key], 
        Array.isArray(obj[key]) ? [] : {}
      );
    } else newObj[key] = obj[key];
  }

  return newObj;
}

