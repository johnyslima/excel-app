import { $node } from '../../core/dom'
import { Emitter } from '../../core/Emitter'
import { StoreSubscriber } from '../../core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $node(selector)
    this.store = options.store
    this.components = options.components || []
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $node.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $node.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // // DEBUG +++
      // if (component.name) {
      //   window['c'+component.name] = component
      // }
      // // ++++++++++
      $el.html(component.toHTML(this.store.getState()))
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach((component) => component.destroy())
  }
}
