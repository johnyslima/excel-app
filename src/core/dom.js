
/**
 *  Класс для упрощения создания dom-элементов
 *  и манипуляций с ними (по аналогии jquery)
 */
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  /**
   * getter/setter for html
   * @param {string} html
   * @return {string}
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }


  /**
   * функция дублирующая функционал addEventListener
   * @param {string} eventType - click, input, mouseDown, mouseMove etc...
   * @param {function} callback
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  /**
   * функция добавления в DOM-дерево
   * @param {Dom} node
   * @return {Dom}
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $node(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
      .keys(styles)
      .forEach((key) => {
        this.$el.style[key] = styles[key]
      })
  }
}

// Функция возвращает новый класс Dom
export function $node(selector) {
  return new Dom(selector)
}

$node.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $node(el)
}
