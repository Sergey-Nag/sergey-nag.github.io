"use strict";

const list = document.getElementById("list");
const addButton = document.querySelector(".input__button_add");
const removeButton = document.querySelector(".input__button_remove");

list.addEventListener("click", activeListItems);
addButton.addEventListener("click", addItemToList);
removeButton.addEventListener("click", removeActiveItemFromList);

let activeTarget = null;

function activeListItems(e) {
  const currTarget = e.target.closest(".list__item");

  if (!currTarget) return;

  if (activeTarget === currTarget) {
    blurActiveClass();

    activeTarget = null;
  } else {
    blurActiveClass();

    activeTarget = currTarget;

    activeTarget.classList.add('list__item_active');
  }
}

function blurActiveClass() {
  document.querySelector('.list__item_active')?.classList.remove('list__item_active');
}

function addItemToList() {
  const input = document.querySelector(".input__text");

  if (input.value === "") return;

  const listItemsHTML = list.innerHTML;
  const newListItem = `<li class="list__item">${input.value}</li>`;

  list.innerHTML = listItemsHTML + newListItem;

  input.value = "";

  blurActiveClass();
}

function removeActiveItemFromList() {
  if (!activeTarget) return;

  activeTarget.remove();
  activeTarget = null;
}
