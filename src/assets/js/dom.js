const emptyArray = []
const slice = emptyArray.slice
const some = emptyArray.some
const every = emptyArray.every
const emptyObj = {}
const elementDisplay = {}
const spaceRe = /\s+/g
const readyRE = /complete|loaded|interactive/
// getComputedStyle() gives the final used values of all the CSS properties of an element.
const getComputedStyle = document.defaultView ? document.defaultView.getComputedStyle : getComputedStyle

function classRE (name) {
  return name in emptyObj
    ? emptyObj[name] : (emptyObj[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
}
function isWindow (obj) {
  return obj != null && obj === obj.window
}
function isArray (obj) {
  return Array.isArray(obj) || obj instanceof Array
}
function pseudoArray (obj) {
  return typeof obj.length === 'number'
}
function isObject (obj) {
  return typeof obj === 'object'
}
function isPlainObject (obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype
}
function extend (target, source, deep) {
  for (var key in source) {
    if (deep && isPlainObject(source[key]) || isArray(source[key])) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {}
      if (isArray(source[key]) && !isArray(target[key])) target[key] = []

      extend(target[key], source[key], deep)
    } else if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
}

function defaultDisplay (nodeName) {
  if (!elementDisplay[nodeName]) {
    let ele
    let display
    ele = document.createElement(nodeName)
    document.body.appendChild(ele)
    display = getComputedStyle(ele, '').getPropertyValue('display')
    ele.remove()
    display === 'none' && (display = 'block')
    elementDisplay[nodeName] = display
  }
  return elementDisplay[nodeName]
}
// Camel style
function camelize (str) {
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : ''
  })
}
// String replacement
function dasherize (str) {
  return str.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}
function $each (ele, callback) {
  if (pseudoArray(ele)) {
    for (var i = 0; i < ele.length; i++) {
      if (callback.call(ele[i], i, ele[i]) === false) return ele
    }
  } else {
    for (var key in ele) {
      if (callback.call(ele[key], key, ele[key]) === false) return ele
    }
  }
  return ele
}
class DOM {
  constructor () {
    this.init = this.init.bind(this)
  }
  isObject = isObject
  trim (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
  init (selector) {
    let dom
    if (!selector) return this
    if (typeof selector === 'string') {
      selector = selector.trim()
      return this.D(
        slice.call(
          document.querySelectorAll(selector)
        ), selector
      )
    }
    if (isObject(selector)) {
      dom = [selector]
      selector = null
    }
    return this.D(dom, selector)
  }
  hasClass (cls) {
    if (!cls) return false
    return some.call(this, function (el) {
      return this.test(el.className)
    }, classRE(cls))
  }
  addClass (cls) {
    return this.setClass(cls, 'add')
  }
  removeClass (cls) {
    return this.setClass(cls, 'remove')
  }
  setClass (cls, ty) {
    if (!cls || !ty) return this
    return this.each((idx) => {
      cls.split(spaceRe).forEach((name) => {
        let _has = this.init(this[idx]).hasClass(name)
        if (ty === 'add' ? !_has : _has) this[idx].classList[ty](name)
      }, this)
    })
  }
  D (dom, selector) {
    dom = dom || []
    Object.setPrototypeOf(dom, Object.getPrototypeOf(this))
    dom.selector = selector || ''
    return dom
  }
  each (callback) {
    every.call(this, function (el, idx) {
      return callback.call(el, idx, el) !== false
    })
    return this
  }
  ready (callback) {
    if (readyRE.test(document.readyState) && document.body) {
      callback()
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        callback()
      }, false)
    }
    return this
  }
  extend (target) {
    let deep
    let args = slice.call(arguments, 1)
    if (typeof target === 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach((arg) => {
      extend(target, arg, deep)
    })
    return target
  }
  css (property, value) {
    // Style collection
    if (arguments.length < 2) {
      let ele = this[0]
      let computedStyle = getComputedStyle(ele, '')
      if (!ele) return
      // When the parameter is a string or array, the corresponding style value is read
      if (typeof property === 'string') return ele.style[camelize(property)] || computedStyle.getPropertyValue(property)
      if (isArray(property)) {
        let objs = {}
        $each(property, function (idx, obj) {
          objs[obj] = (ele.style[camelize(obj)] || computedStyle.getPropertyValue(obj))
        })
        return objs
      }
    }

    let css = ''
    if (typeof property === 'string') {
      if (!value && value !== 0) {
        this.each(function () {
          // The CSSStyleDeclaration.removeProperty() method interface removes a property from a CSS style declaration object.
          return this.style.removeProperty(dasherize(property))
        })
      } else {
        css = dasherize(property) + ':' + value
      }
    }
    if (isPlainObject(property)) {
      for (var key in property) {
        // When the value of property[key] is null/undefined, the attribute is deleted
        if (!property[key] && property[key] !== 0) {
          this.each(function () {
            this.style.removeProperty(dasherize(key))
          })
        } else {
          css += dasherize(key) + ':' + property[key] + ';'
        }
      }
    }
    return this.each(function () {
      // The last semicolon in IE will be deleted
      // At the same time, prevent the original style from being deleted
      this.style.cssText += ';' + css
    })
  }
  show () {
    return this.each(function () {
      this.style.display === 'none' && (this.style.display = '')
      if (getComputedStyle(this, '').getPropertyValue('display') === 'none') {
        this.style.display = defaultDisplay(this.nodeName)
      }
    })
  }
  hide () {
    return this.css('display', 'none')
  }
}

export default new DOM().init
