"use strict";

const colsHeader = document.querySelectorAll(".col-title");
const dataTableRows = document.querySelector("#data");
const originalData = [...dataTableRows.children];
// const colsSettings = {};
const state = new State();

for (let header of colsHeader) {
  header.addEventListener("click", activeColumn);
}

function activeColumn(e) {
  const colHeader = e.target.closest(".col-title");
  const colTitle = colHeader.textContent.trim();
  const headersArr = [...colsHeader];

  const colIndex = getColumnIndex(headersArr, colTitle);

  // colsSettings[colIndex] = colsSettings[colIndex] ?? {
  //   sortAdjust: 1,
  //   count: 1,
  // };

  const isSorted = sortTable(colIndex);

  // if (isSorted) {
  //   colsSettings[colIndex].sortAdjust = colsSettings[colIndex].sortAdjust * -1;
  //   colsSettings[colIndex].count++;
  // } else {
  //   colsSettings[colIndex] = null;
  //   clearActiveHeaders();
  // }
}

function State() {
  this.stateArr = [];

  this.add = (index) => {
    this.stateArr.push({
      index,
      sortAdjust: 1,
      count: 1,
      isPrimary: this.length() > 0 ? false : true,
    });
  };

  this.update = (index) => {
    const currElem = this.stateArr.find((elem) => elem.index === index);

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

function getColumnIndex(arr, title) {
  return arr.findIndex((elem) => elem.textContent.trim() === title);
}

function clearActiveHeaders(isSettingsClear = false) {
  const headers = document.querySelectorAll(".col-title.active");

  for (let head of headers) {
    head.className = head.classList.contains("align-right")
      ? "col-title align-right"
      : "col-title";
  }
}

function toggleIndicator(header, sortAdjust) {


  // clearActiveHeaders(true);

  // if (!header.classList.contains("active")) header.classList.add("active");

  // if (sortAdjust === -1) {
  //   header.classList.remove("up");
  //   header.classList.add("down");
  // } else {
  //   header.classList.remove("down");
  //   header.classList.add("up");
  // }
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

  toggleIndicator();
}

function compareAllValues(arr, a, b) {
  const lastElem = arr.pop();
  const cellA = returnCellValue(a.children[lastElem.index]);
  const cellB = returnCellValue(b.children[lastElem.index]);

  if (arr.length === 0)
    return cellA > cellB ? lastElem.sortAdjust : lastElem.sortAdjust * -1;

  return compareAllValues(arr, a, b);
}
// for (let elem of arr) {
//   const cellA = returnCellValue(a.children[elem.index]);
//   const cellB = returnCellValue(b.children[elem.index]);

//   if (cellA > cellB) return
// }
function returnCellValue(obj) {
  const content = obj.textContent;

  if (!isNaN(content)) return +content;

  if (content.includes("$")) return returnValidNumber(content);

  return content;
}

function returnValidNumber(string) {
  const multipliers = {
    M: 1e6,
    B: 1e9,
  };
  const power = string[string.length - 1];

  const stringNumber = string.replace("$", "").replace(power, "");

  return stringNumber * multipliers[power];
}
