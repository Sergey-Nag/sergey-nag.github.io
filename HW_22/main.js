// №1
function returnFibonacciNumber(number) {
  if (number < 1) return 0;
  if (number < 3) return 1;

  let result = 0;
  let lastResult = 1;
  let preLastResult = 1;

  for (let i = 2; i < number; i++) {
    result = lastResult + preLastResult;
    preLastResult = lastResult;
    lastResult = result;
  }

  return result;
}

function returnFibonacciNumberRecurcion(number) {
  if (number < 1) return 0;
  if (number < 3) return 1;

  return (
    returnFibonacciNumberRecurcion(number - 1) +
    returnFibonacciNumberRecurcion(number - 2)
  );
}


// №2
function returnFactorial(number) {
  if (number < 1) return 1;

  let result = number;

  for (let i = 1; i < number; i++) {
    result *= i;
  }

  return result;
}

function returnFactorialRecursion(number) {
  if (number < 1) return 1;

  return number * returnFactorialRecursion(number - 1);
}

