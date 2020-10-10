"use strict";

const inputNumber1 = prompt("Запрос (1/3):\nВведите первое число для операции", "");
const inputOperator = prompt("Запрос (2/3):\nВведите оператор — (+, -, *, /, **)", "");
const inputNumber2 = prompt("Запрос (3/3):\nВведите второе число для операции", "");

alert(returnMathResult(inputNumber1, inputNumber2, inputOperator));

function returnMathResult(str1, str2, operator) {
  let result = "Ответ:\n" + str1 + operator + str2 + "= ";

  if (str1 !== "" && !!str1 && str2 !== "" && !!str2) {
    let num1 = +str1;
    let num2 = +str2;

    if (num1 >= 0 && num2 >= 0) {

      if (operator === "+") result += num1 + num2;
      else if (operator === "-") result += num1 - num2;
      else if (operator === "*") result += num1 * num2;
      else if (operator === "/") result += num1 / num2;
      else if (operator === "**") result += num1 ** num2;
			else result = "!Ошибка\nОператор не распознан";
			
		} else result = "!Ошибка\nЧисла не распознаны";
		
  } else result = "!Ошибка\nЧисла не распознаны";

  return result;
}
