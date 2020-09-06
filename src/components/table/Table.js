import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { $node } from '../../core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })

    this.$positionX = 0
    this.$positionY = 0
    this.$resizeOn = false
  }

  toHTML() {
    return createTable(25)
  }

  // onClick() {
  //   console.log('click')
  // }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $node(event.target)
      // const $parent = $resizer.$el.parentNode // bad!
      // const $parent = $resizer.$el.closest('.column') // better but bad
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const indexCol = event.target.dataset.col
      const allCellsOfCol = document.querySelectorAll(`div[data-col="${indexCol}"]`)

      console.log(allCellsOfCol)


      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'

        allCellsOfCol.forEach(element => {
          element.style.width = value + 'px'
        })
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }

    }
    console.log('start resizing', event.target.dataset.resize)
    // if ('mousedown', event.target.dataset.resize) {
    //   this.$resizeOn = true
    //   if (event.target.dataset.resize === 'col') {
    //     this.$positionX = event.x
    //   } else if (event.target.dataset.resize === 'row') {
    //     this.$positionY = event.y
    //   }
    //   console.log('start resizing', event.target.dataset.resize)
    // }
  }

  onMousemove(event) {
    // if (this.$resizeOn) {
    //   if (event.target.dataset.resize === 'col') {
    //     const diffPositionX = event.x - this.$positionX
    //     event.target.parentElement.style.width = event.target.parentElement.offsetWidth + diffPositionX + 'px'
    //   } else if (event.target.dataset.resize === 'row') {
    //     const diffPositionY = event.y - this.$positionY
    //     event.target.parentElement.style.height = event.target.parentElement.offsetHeight + diffPositionY + 'px'
    //   }
    //   // console.log('mousemove', event)
    // }
  }

  onMouseup(event) {
    this.$resizeOn = false
    // console.log('mouseup', event)
  }
}
