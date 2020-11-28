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
  
  if (state.isContains(colIndex)) state.update(colIndex);
  else state.add(colIndex);

  // colsSettings[colIndex] = colsSettings[colIndex] ?? {
  //   sortAdjust: 1,
  //   count: 1,
  // };

  const isSorted = sortTable(colIndex, state);
  // toggleIndicator(colHeader, colsSettings[colIndex].sortAdjust);

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
      isPrimary: this.length() > 0 ? false : true 
    });
  };

  this.update = (index) => {
    const currElem = this.stateArr.find(elem => elem.index === index);
    
    if (currElem.count === 2) {
      this.remove(index);
      return;
    }

    currElem.sortAdjust = currElem.sortAdjust * -1;
    currElem.count++;
  }

  this.remove = (index) => {
    this.stateArr.splice(
      this.getPositionInArr(index),
      1
    );
  }

  this.isContains = (index) => {
    return this.getPositionInArr(index) !== -1 ? true : false;
  }

  this.getPositionInArr = (index) => {
    return this.stateArr.findIndex(elem => elem.index === index);
  }

  this.length = () => {
    return this.stateArr.length;
  }
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
  clearActiveHeaders(true);

  if (!header.classList.contains("active")) header.classList.add("active");

  if (sortAdjust === -1) {
    header.classList.remove("up");
    header.classList.add("down");
  } else {
    header.classList.remove("down");
    header.classList.add("up");
  }
}

function sortTable(columnIndex, colSettings) {
  let dataRows = [...dataTableRows.children];
  
  console.log(dataRows)


  // if (colSettings.count < 3) {
    // dataRows.sort((a, b) => {
    //   const cellA = returnCellValue(a.children[columnIndex]);
    //   const cellB = returnCellValue(b.children[columnIndex]);

    //   return cellA > cellB
    //     ? colSettings.sortAdjust
    //     : colSettings.sortAdjust * -1;
    // });

    // dataTableRows.append(...dataRows);

    // return true;
  // } else {
  //   dataTableRows.append(...originalData);

  //   return false;
  // }
}

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
