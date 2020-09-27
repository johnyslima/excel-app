// Pure functions

/**
 * Функция меняет первую букву на заглавную
 * @param {*} string
 * @return {string} string
 */
export function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/**
 * Функция формирует массив из заданных start/end
 * @param {*} start
 * @param {*} end
 * @return {array}
 */
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}
