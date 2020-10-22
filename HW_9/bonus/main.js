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


  // Если есть товары со скидкой - спрашиваю, 
  // уверен ли пользователь, что хочет их отложить
  if (laterPurchasesNames) {
    isPostponed = confirm(`Вы точно хотите отложить покупку товаров со скидкой: ${laterPurchasesNames}?`);
  }


  // Если пользователь передумал - добавляю к покупкам товары со скидкой
  if (!isPostponed) {
    for (let i = 0; postponedPurchases.length; i += 1) {
      if (postponedPurchases[i].hasDiscount) {
        if (postponedPurchases[i].isAvailable) {
          purchasesToBuy.push(postponedPurchases[i]);
        }
      }
    }
  }


  let paymentMethod = user.paymentMethod;


  // Проверяем наличие способа оплаты
  if (!paymentMethod) {
    // Просим ввести способ оплаты, если он не определён
    const inputMethod = prompt("Введите способ оплаты:", "");


    if (!inputMethod) {
      // Выводим ошибку пользователю, если способ оплаты не был введён
      alert('Вы не можете совершить покупку, не выбрав способ оплаты!');


      // Отправляем ошибку в логи
      console.error(`Paying method is not defined for user: ${user.id}`);


      return;
    } else {
      paymentMethod = inputMethod;
    }
  }


  senBuyRequest({
    purchases: purchasesToBuy,
    paymentMethod: paymentMethod,
  }, function () {
    // Колбек для удачной покупки


    let purchasedNames = '';


    // Создаю строку с именами покупок
    for (let i = 0; i < purchasesToBuy.length; i += 1) {
      if (purchasedNames) {
        purchasedNames += ', ' + purchasesToBuy[i].name;
      } else {
        purchasedNames += purchasesToBuy[i].name;
      }
    }


    // показываю пользователю сообщение об удачной покупке
    alert(`Поздравляем, ${user.name}! Вы приобрели: ${purchasedNames}`);


    let purchasedIds = '';

    // Создаю строку с идентификаторами покупок
    for (let i = 0; i < purchasesToBuy.length; i += 1) {
      if (purchasedIds) {
        purchasedIds += ', ' + purchasesToBuy[i].id;
      } else {
        purchasedIds += purchasesToBuy[i].id;
      }
    }


    // отправляю в логи сообщение об удачной покупке
    console.info(`New purchases: ${purchasedIds}, user: ${user.id}.`);
  }, function () {
    // Колбек на случай ошибки


    // показываю пользователю сообщение об ошибке
    alert(`Извините, ${user.name}, но что-то пошло не так :(`);


    let purchasedIds = '';

    // Создаю строку с идентификаторами покупок
    for (let i = 0; i < purchasesToBuy.length; i += 1) {
      if (purchasedIds) {
        purchasedIds += ', ' + purchasesToBuy[i].id;
      } else {
        purchasedIds += purchasesToBuy[i].id;
      }
    }


    // отправляю в логи сообщение об ошибке при покупке
    console.error(`Failed purchases: ${purchasedIds}, user: ${user.id}.`);
  });
}
