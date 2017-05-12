
class Dom {
  // Remove spaces before and after
  trim (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
  // Does the query element have the class name
  hasClass (el, cls) {
    // Prompt and fault tolerance when spaces are present in the class name
    if (!el) return
    if (!cls) throw new Error('className cannot be empty')
    if (cls.indexOf(' ') !== -1) console.info('The className is best not to contain space')

    let classes = (cls || '').split(' ')
    let i = 0
    let len = classes.length

    for (; i < len; i++) {
      if (el.classList) {
        if (el.classList.contains(classes[i])) return true
      } else {
        if ((' ' + classes[i] + ' ').indexOf(' ' + cls + ' ') > -1) return true
      }
    }
    return false
  }
  addClass (el, cls) {
    this.setClass(el, cls, 'add')
  }
  removeClass (el, cls) {
    this.setClass(el, cls, 'remove')
  }
  setClass (el, cls, type) {
    if (!el || !cls || !type) return
    // When spaces are present in class names, they are cut
    let classes = (cls || '').split(' ')
    let curClass = el.className
    let i = 0
    let len = classes.length

    if (type === 'add') {
      for (; i < len; i++) {
        if (el.classList) {
          el.classList.add(classes[i])
        } else {
          if (!this.hasClass(el, classes[i])) {
            curClass += ' ' + classes[i]
          }
        }
      }
    } else {
      for (; i < len; i++) {
        if (el.classList) {
          el.classList.remove(classes[i])
        } else {
          if (this.hasClass(el, classes[i])) {
            curClass.replace(' ' + classes[i] + ' ', ' ')
          }
        }
      }
    }

    if (!el.classList) {
      el.className = curClass
    }
  }
  addEventListener = (() => {
    if (document.addEventListener) {
      return (event, el, handler) => {
        el.addEventListener(event, handler, false)
      }
    } else {
      return (event, el, handler) => {
        el.attachEvent('on' + event, handler)
      }
    }
  })()
}

export default new Dom()
