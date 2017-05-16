// const docEle = document.documentElement
// const matches = this.docEle.matches ||
//               this.docEle.webkitMatchesSelector ||
//               this.docEle.mozMatchesSelector ||
//               this.docEle.oMatchesSelector ||
//               this.docEle.msMatchesSelector
// MatchesSelector (ele, selector) {
//   if (ele.matches) return ele.matches(selector)
//   if (ele.matchesSelector) return ele.matchesSelector(selector)
//   if (ele.webkitMatchesSelector) return ele.webkitMatchesSelector(selector)
//   if (ele.msMatchesSelector) return ele.msMatchesSelector(selector)
//   if (ele.mozMatchesSelector) return ele.mozMatchesSelector(selector)
//   if (ele.oMatchesSelector) return ele.oMatchesSelector(selector)
//   if (ele.querySelectorAll) {
//     let matches = (ele.document || ele.ownerDocument).querySelectorAll(selector)
//     let i = 0
//     while (matches[i] && matches[i] !== ele) i++
//     return !!matches[i]
//   }
//   throw new Error('您的浏览器版本太旧，请升级您的浏览器 (Your browser version is too old,please upgrade your browser)')
// }
const emptyArray = []
// function classReg (cls) {
//   return new RegExp('(^|\\s)' + cls + '(\\s|$)')
// }
// function className (node, value) {
//   let klass = node.className
//   let svg = klass && klass.baseVal !== undefined

//   if (value === undefined) return svg ? klass.baseVal : klass
//   svg ? (klass.baseVal = value) : (node.className = value)
// }

class Dom {
  // constructor () {}
  // Remove spaces before and after
  trim (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
  // Does the query element have the class name
  hasClass (cls) {
    if (!cls) return false
    emptyArray.some.call({ 'a': 'asas' }, function (el) {
      console.log(el)
    })
  }
  addClass (el, cls) {
    this.setClass(el, cls, 'add')
    return this
  }
  removeClass (el, cls) {
    this.setClass(el, cls, 'remove')
    return this
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
  ready (callback) {
    let readyRE = /complete|loaded|interactive/
    readyRE.test(document.readyState) && document.body ? callback(this)
      : document.addEventListener('DOMContentLoaded', function () { callback(this) }, false)
  }
  selector (selector) {
    // string === "", null, undefined, false
    selector = this.trim(selector)

    if (!selector) return this
    if (typeof selector === 'string') {
      return this.D(document.querySelectorAll(selector), selector)
    }
  }
  D (dom, selector) {
    dom = dom || []
    Object.setPrototypeOf(dom, this)
    dom.selector = selector || ''
    return dom
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

let dom = new Dom().init()

export default dom
