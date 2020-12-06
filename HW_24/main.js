"use strict";

// №1
function createRangeFilter(min, max) {
  return function (i) {
    return i >= min && i <= max ? true : false;
  };
}

const test = [1, 2, 3, 4, 5, 6].filter(createRangeFilter(2, 4));

console.log(test);

// №2
function createKeyBy(propName) {
  return function (arr) {
    return arr.reduce((prev, curr) => {
      prev.push(curr[propName]);
      return prev;
    }, []);
  };
}

const testArr = [
  {
    a: "1",
    b: "2",
    c: "3",
  },
  {
    a: "4",
    b: "5",
    c: "6",
  },
  {
    a: "7",
    b: "8",
    c: "9",
  },
  {
    a: "10",
    b: "11",
    c: "22",
  },
];

const keyBy = createKeyBy("c");

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
