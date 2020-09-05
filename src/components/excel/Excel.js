import { $node } from '../../core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $node(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $node.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $node.create('div', Component.className)
      const component = new Component($el)
      // // DEBUG +++
      // if (component.name) {
      //   window['c'+component.name] = component
      // }
      // // ++++++++++
      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
