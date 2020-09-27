import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './helpers'
import { TableSelection } from './TableSelection'
import { $node } from '../../core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })

    this.$positionX = 0
    this.$positionY = 0
  }

  toHTML() {
    return createTable(25)
  }

  prepare() {
    this.selection = new TableSelection
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('Formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('Formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('Table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $node(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey ) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $nextCell = this.$root.find(nextSelector(key, id))
      this.selectCell($nextCell)
    }
  }

  onInput() {
    this.$emit('Table:input', $node(event.target))
  }
}

