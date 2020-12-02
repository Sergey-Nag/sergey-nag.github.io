"use strict";

const list = document.getElementById('list');

list.addEventListener('click', activeListItems);

let activeTarget = null;

function activeListItems(e) {

  if (!activeTarget) activeTarget = e.target.closest('.list__item');
  
  if (!!activeTarget) activeTarget.classList.toggle('list__item_active');
    

  if (!!activeTarget && !!e.target.closest('.input__button_remove')) {
    
    activeTarget.remove();
    activeTarget = null;
    
  }

}
