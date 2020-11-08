"use strict";

const array = [
  {name: 'Vasya', surname: 'Ivanov'},
  {name: 'Vanya', surname: 'Ivanov'},
  {name: 'Albert', surname: 'Vasyliev'}
];

function keyBy(arr, key) {
  return arr.reduce((obj, elem) => {
    let objKey = elem[key];

    if (!!obj[objKey]) obj[objKey].push(elem);
    else obj[objKey] = [elem];

    return obj;
  }, {});
}

console.log(keyBy(array, 'name'));
console.log(keyBy(array, 'surname'));