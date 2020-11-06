function sumNumbers1(arr) {
  let result = 0;

  for (let number of arr) result += number;

  return result;
}

function sumNumbers2(arr) {
  return arr.reduce((result, number) => result + number);
}


function mapToUpperCase1(arr) {
  let result = [];

  for (let string of arr) result.push(string.toUpperCase());

  return result;
}

function mapToUpperCase2(arr) {
  return arr.map(string => string.toUpperCase());
}
