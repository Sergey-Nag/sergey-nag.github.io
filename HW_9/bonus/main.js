'use strict';

function filterPurchases(purchases, toBuy, postponed) {
  for (let i = 0; i < purchases.length; i += 1) {
    if (purchases[i].isChecked) {
      toBuy.push(purchases[i]);
    } else {
      postponed.push(purchases[i]);
    }
  }
}

function returnLaterPurchasesString(postponedPurchases) {
  let laterPurchasesNames = '';
  for (let i = 0; i < postponedPurchases.length; i += 1) {
    if (postponedPurchases[i].hasDiscount && postponedPurchases[i].isAvailable) {
      laterPurchasesNames += ((laterPurchasesNames)? ', ' : '') + postponedPurchases[i].name; 
    }
  }
  return laterPurchasesNames;
}

function buy(purchases) {
  const purchasesToBuy = []
  const postponedPurchases = [];
  filterPurchases(purchases, purchasesToBuy, postponedPurchases);

  const laterPurchasesNames = returnLaterPurchasesString(postponedPurchases);
  
  
  let isPostponed = true;


function sortPurchasesByChecked(purchases, arrToBuy, arrPostponed) {
  for (let i = 0; i < purchases.length; i += 1) {
    if (purchases[i].isChecked) arrToBuy.push(purchases[i]);
    else arrPostponed.push(purchases[i]);
  }
}

function walkDiscountAvailableProducts(arrProducts, callback) {
  for (let i = 0; i < arrProducts.length; i += 1) {
    if (arrProducts[i].hasDiscount && arrProducts[i].isAvailable) {
      callback(arrProducts[i]);
    }
  }
}

function returnDiscountPostponedNames(arrProducts) {
  let result = [];

  walkDiscountAvailableProducts(arrProducts, (item) => result.push(item));

  return concatProductsBy("name", result);
}

function checkDiscountPostponedPurchases(toBuy, arrPostponed) {
  const discountPurchasesNames = returnDiscountPostponedNames(arrPostponed);

  if (isUserConfirmPostponed(discountPurchasesNames)) {
    walkDiscountAvailableProducts(arrPostponed, (item) => {
      toBuy.push(item);
    });
  }
}

function isUserConfirmPostponed(postponedNames) {
  if (postponedNames) return false;
  return confirm(`Вы точно хотите отложить покупку товаров со скидкой: ${postponedNames}?`);
}

function askUserPaymentMethod(userId) {
  const inputMethod = prompt("Введите способ оплаты:", "");

  if (inputMethod) return inputMethod;

  onError(
    "Вы не можете совершить покупку, не выбрав способ оплаты!",
    `Paying method is not defined for user: ${userId}`
  );
}

function onError(userMessage, logMessage) {
  alert(userMessage);
  console.error(logMessage);
}

function onSuccess(userMessage, logMessage) {
  alert(userMessage);
  console.info(logMessage);
}

function concatProductsBy(key, arrProducts) {
  let result = "";

  for (let i = 0; i < arrProducts.length; i += 1) {
    result += (result ? ", " : "") + arrProducts[i][key];
  }

  return result;
}
