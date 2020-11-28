"use strict";

const colsHeader = document.querySelectorAll(".col-title");
const dataTableRows = document.querySelector("#data");
const originalData = [...dataTableRows.children];

const state = new State();

for (let header of colsHeader) {
  header.addEventListener("click", activeColumn);
}

function activeColumn(e) {
  const colHeader = e.target.closest(".col-title");
  const colTitle = colHeader.textContent.trim();
  const headersArr = [...colsHeader];

  const colIndex = getColumnIndex(headersArr, colTitle);

  sortTable(colIndex);
}

function getColumnIndex(arr, title) {
  return arr.findIndex((elem) => elem.textContent.trim() === title);
}

function sortTable(columnIndex) {
  let dataRows = [...dataTableRows.children];

  if (state.isContains(columnIndex)) state.update(columnIndex);
  else state.add(columnIndex);

  if (state.length() > 0) {
    dataRows.sort((a, b) => compareAllValues([...state.stateArr], a, b));
  } else {
    dataRows = originalData;
  }

  dataTableRows.append(...dataRows);

  toggleIndicators(columnIndex);
}

function State() {
  this.stateArr = [];

  this.add = (index) => {
    this.stateArr.push({
      index,
      sortAdjust: 1,
      count: 1,
    });
  };

  this.update = (index) => {
    const currElem = this.getElement(index);

    if (currElem.count === 2) {
      this.remove(index);
      return;
    }

    currElem.sortAdjust = currElem.sortAdjust * -1;
    currElem.count++;
  };

  this.remove = (index) => {
    this.stateArr.splice(this.getPositionInArr(index), 1);
  };

  this.getElement = (index) => {
    return this.stateArr[this.getPositionInArr(index)];
  };

  this.isContains = (index) => {
    return this.getPositionInArr(index) !== -1 ? true : false;
  };

  this.getPositionInArr = (index) => {
    return this.stateArr.findIndex((elem) => elem.index === index);
  };

  this.length = () => {
    return this.stateArr.length;
  };
}

function compareAllValues(arr, a, b) {
  const lastElem = arr.shift();

  const cellA = returnCellValue(a.children[lastElem.index]);
  const cellB = returnCellValue(b.children[lastElem.index]);

  if (arr.length !== 0 && cellA === cellB) return compareAllValues(arr, a, b);

  return cellA > cellB ? lastElem.sortAdjust : lastElem.sortAdjust * -1;
}

function returnCellValue(obj) {
  const content = obj.textContent;

  if (!isNaN(content)) return +content;

  if (content.includes("$")) return returnValidMoneyNumber(content);

  return content;
}

function returnValidMoneyNumber(string) {
  const multipliers = {
    M: 1e6,
    B: 1e9,
  };

  const power = string[string.length - 1];

  const stringNumber = string.replace("$", "").replace(power, "");

  return stringNumber * multipliers[power];
}

function toggleIndicators(index) {
  const elem = state.getElement(index);
  const activeHeader = document.querySelector(
    `.col-title:nth-child(${index + 1})`
  );

  togglePrimaryIndicators();

  if (!elem) {
    activeHeader.className = activeHeader.classList.contains("align-right")
      ? "col-title align-right"
      : "col-title";

    return;
  }

  activeHeader.classList.add("active");

  toggleUpDownIndicator(activeHeader, elem);
}

function togglePrimaryIndicators() {
  const primaryHeaderState = state.stateArr[0];

  [...document.querySelectorAll(".col-title")].forEach((elem, i) => {
    elem.classList.remove("primary");

    if (state.isContains(i))
      elem.setAttribute("data-index", state.getPositionInArr(i) + 1);

    if (!!primaryHeaderState && i === primaryHeaderState.index)
      elem.classList.add("primary");
  });
}

function toggleUpDownIndicator(header, elem) {
  if (elem.sortAdjust === -1) {
    header.classList.remove("up");
    header.classList.add("down");
  } else {
    header.classList.remove("down");
    header.classList.add("up");
  }
}
