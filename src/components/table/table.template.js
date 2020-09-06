const CODES = {
  A: 65,
  Z: 90
}

function toCell(indexRow, indexCol) {
  return `
  <div class="cell" contenteditable data-col="${toChar(null, indexCol)}" data-row="${indexRow+1}">
  <div class="col-resize"></div>
  </div>
`
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col" data-col="${col}"></div>
    </div>
  `
}

function createRow(content, indexRow = '') {
  const resizer = indexRow && '<div class="row-resize" data-resize="row"></div>'
  return `
    <div class="row">
      <div class="row-info">
        ${indexRow}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let indexRow = 0; indexRow <= rowsCount; indexRow++) {
    const cells = new Array(colsCount)
      .fill('')
      // .map(toCell)
      .map((_, indexCol) => (
        toCell(indexRow, indexCol)
      ))
      .join('')
    rows.push(createRow(cells, indexRow+1))
  }

  return rows.join('')
}


// Старая реализация через массив
// function createCell() {
//   return `
//     <div class="cell" contenteditable="">b1</div>
//   `
// }

// function createCol(content) {
//   return `
//     <div class="column">${String.fromCharCode(content)}</div>
//   `
// }

// function createRow(content, indexRow = '') {
//   return `
//     <div class="row">
//       <div class="row-info">${indexRow}</div>
//       <div class="row-data">${content}</div>
//     </div>
//   `
// }

// export function createTable(rowsCount = 15) {
//   const colsCount = CODES.Z - CODES.A
//   const rows = []

//   let cols = ''
//   let cells = ''
//   for (let i = CODES.A; i <= CODES.Z; i++) {
//     cols = cols + createCol(i)
//     cells = cells + createCell()
//   }

//   rows.push(createRow(cols))

//   for (let i = 1; i <= rowsCount; i++) {
//     rows.push(createRow(cells, i))
//   }

//   return rows.join('')
// }

