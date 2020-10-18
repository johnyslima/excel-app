import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './helpers'
import { TableSelection } from './TableSelection'
import { $node } from '../../core/dom'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'
// import { tableResize } from '../../redux/actions'

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
    return createTable(25, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('Formula:input', value => {
      this.selection.current
        .attr('data-value', value )
        .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('Formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('Table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log('styles to dispatch', styles)
    this.$dispatch(actions.changesStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
      // console.log('Resize data', data)
    } catch (error) {
      console.warn('Resize error', error.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $node(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($node(event.target).text())
  }
}

