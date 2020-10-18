import { defaultStyles } from '../../constants'
import { toInlineStyles } from '../../core/helpers'
import { parse } from '../../core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width}">
        ${parse(data) || ''}
      </div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div
    class="column"
    data-type="resizable"
    data-col="${index}"
    style="width:${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, indexRow = '', state) {
  const resizer = indexRow && '<div class="row-resize" data-resize="row"></div>'
  const height = getHeight(state, indexRow)
  return `
    <div
    class="row"
    data-type="resizable"
    data-row="${indexRow}"
    style="height: ${height}">
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

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let indexRow = 0; indexRow <= rowsCount; indexRow++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(indexRow, state))
      .join('')
    rows.push(createRow(cells, indexRow+1, state.rowState))
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

