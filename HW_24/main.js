"use strict";


// №1
function createRangeFilter(min, max) {
  return function (i) {
    return i >= min && i <= max;
  };
}

const test = [1, 2, 3, 4, 5, 6].filter(createRangeFilter(2, 4));

console.log(test);


// №2
function createKeyBy(propName) {
  return function (arr) {
    return arr.reduce((obj, curr) => {
      const objKey = curr[propName];

      obj[objKey] = obj[objKey] ?? [];
  
      obj[objKey].push(curr);
  
      return obj;
    }, {});
  };
}

const testArr = [
  {name: 'Vasya', surname: 'Ivanov'},
  {name: 'Vanya', surname: 'Ivanov'},
  {name: 'Albert', surname: 'Vasyliev'},
]

const keyBy = createKeyBy("name");

console.log(keyBy(testArr));


// №3
function createCalcPercent(percent) {
  return function (value) {
    return (value / 100) * percent;
  };
}

const calcPercent = createCalcPercent(50);

console.log(calcPercent(100));
console.log(calcPercent(50));
