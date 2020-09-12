import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './helpers'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })

    this.$positionX = 0
    this.$positionY = 0
  }

  toHTML() {
    return createTable(25)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
}
