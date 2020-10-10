"use strict";

const inputValue1 = prompt("Введите первое число", "");
const inputValue2 = prompt("Введите второе число", "");

alert(returnNaturalNumber(inputValue1, inputValue2));

function returnNaturalNumber(val1, val2) {
  let result = "Ближайшее к "+val1+" и кратное "+val2+"\nОтвет: ";

  // if (!!val1 && !!val2) {
  if (val1 !== "" && !!val1 && val2 !== "" && !!val2) {
    const num1 = Math.trunc(+val1);
    console.log(val1, num1)
    const num2 = Math.trunc(+val2);
    
    if (num1 >= 0 && num2 > 0) {

      if (num1 > num2) result += Math.round(num1 / num2) * num2;
      else result += num2;

    } else result = "!Ошибка\nВведите целые положительные числа";
  } else result = "!Ошибка\nЧисла не распознаны";

  return result;
}
