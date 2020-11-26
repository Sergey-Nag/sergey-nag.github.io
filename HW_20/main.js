"use strict";

const colsHeader = document.querySelectorAll(".col-title");
const dataTableRows = document.querySelector("#data");
const originalData = [...dataTableRows.children];
const colsSettings = {};

for (let header of colsHeader) {
  header.addEventListener("click", activeColumn);
}

function activeColumn(e) {
  const colHeader = e.target.closest(".col-title");
  const colTitle = colHeader.textContent.trim();
  const headersArr = [...colsHeader];

  const colIndex = getColumnIndex(headersArr, colTitle);

  colsSettings[colIndex] = colsSettings[colIndex] ?? {
    sortAdjust: 1,
    count: 1,
  };

  toggleIndicator(colHeader, colsSettings[colIndex].sortAdjust);

  const isSorted = sortTable(colIndex, colsSettings[colIndex]);

  if (isSorted) {
    colsSettings[colIndex].sortAdjust = colsSettings[colIndex].sortAdjust * -1;
    colsSettings[colIndex].count++;
  } else {
    colsSettings[colIndex] = null;
    clearActiveHeaders();
  }
}


function getColumnIndex(arr, title) {
  return arr.findIndex((elem) => elem.textContent.trim() === title);
}

function clearActiveHeaders() {
  const headers = document.querySelectorAll(".col-title.active");
  for (let head of headers) {
    if (head.classList.contains('align-right')) {
      head.className = 'col-title align-right';
    } else {
      head.className = 'col-title';
    }
  }
}

function toggleIndicator(header, sortAdjust) {
  clearActiveHeaders();

  if (!header.classList.contains('active')) header.classList.add("active");

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

  if (colSettings.count < 3) {
    dataRows.sort((a, b) => {
      const cellA = returnCellValue(a.children[columnIndex]);
      const cellB = returnCellValue(b.children[columnIndex]);

      return cellA > cellB ?
        colSettings.sortAdjust :
        colSettings.sortAdjust * -1;
    });

    dataTableRows.append(...dataRows);

    return true;
  } else {
    dataTableRows.append(...originalData);

    return false;
  }

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
    B: 1e9
  };
  const power = string[string.length - 1];

  const stringNumber = string.replace("$", "").replace(power, "");

  return stringNumber * multipliers[power];
}
