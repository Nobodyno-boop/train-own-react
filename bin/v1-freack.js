/**
 *  Fake react just for fun & use JSX use
 *
 *
 *  Based on https://stackoverflow.com/a/42405694
 *
 * TODO rework node: first is code execute
 *
 *
 *
 */

class Freack {
  constructor() {
    this.base = null
    this.elements = []
    this.__id = ''
    this._refresh = false
    this._t = null
    this.states = []
    this.tmpstats = []
    this.tid = ''
  }

  _id() {
    let d = Math.random().toString(36).slice(2, 7)
    console.warn('id: %s', d)
    return d
  }
  getState(id) {
    let f = this.states.find((x) => x.id === id)
    return f ? f.value : null
  }

  updateState(id, v) {
    let f = this.states.find((x) => x.id === id)

    if (f) {
      f.value = v
      let z = this.elements.find((x) => x.id === f.elid)
      this.refresh(z.props)
    }
  }

  registerState(v) {
    if (this._refresh) {
      let st = this.states.find((x) => x.elid === this.tid)
      return st
    }

    let opt = {
      elid: '-',
      id: Math.random().toString(36).slice(2, 7),
      value: v,
    }
    // base
    if (this.__id !== '') {
      this.states.push({ ...opt, elid: this.__id })
    }

    return opt
  }

  createElement(tag, props, ...childs) {
    let id = this.__id === '' ? this._id() : this.__id
    if (this._refresh) {
      id = this.tid
    } else {
      this.tid = id
    }
    let opt = {
      node: tag,
      props: { ...props, id: id } || [],
      childs: childs,
      id: id,
      _t: this._t ?? tag,
    }

    if (typeof tag === 'function') {
      this.__id = ''
      this._t = null
      console.group(tag.name)
      let c = tag({ ...props, id: id }, childs)
      console.groupEnd()
      return c
    }
    this.__id = ''
    this._t = null
    return opt
  }

  fakeRender(tag, props, childs) {
    if (typeof tag === 'function') {
      this.elements = []
      this.__id = ''
      this.base = tag.name ?? 'r'
      console.group(tag.name)
      this.__id = Math.random().toString(36).slice(2, 7)
      this._t = tag
      let c = tag({ ...props, id: this.__id }, childs)
      console.log(c)
      console.groupEnd()
      return this.to(c)
    } else throw new Error('Need to be a function.')
  }

  refresh(props) {
    this._refresh = true
    console.group('reload')
    let el = this.elements.find((x) => x.id === props.id)
    let dom = document.getElementById(props.id)

    if (el && dom) {
      this.tid = props.id
      dom.replaceWith(this.to(el._t({ ...props })))
    }
    console.groupEnd()
    this._refresh = false
  }
  findEl(id) {}

  /**
   *
   * @param {{node:string, props: [], childs: [{node: string, props:[], childs: [{}]}]}} c
   */
  to(c) {
    console.log(c)
    if (typeof c.node === 'undefined') {
      return document.createTextNode(c)
    }
    let element = document.createElement(c.node)
    let props = c.props

    for (let name in props) {
      if (name && props.hasOwnProperty(name)) {
        let value = props[name]
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value != null) {
          // add support onClick onChange etc
          if (name.startsWith('on') && name.toLowerCase() in window) {
            element.addEventListener(name.toLowerCase().substr(2), value)
          } else {
            element.setAttribute(name, value.toString())
          }
        }
      }
    }

    let childsElements = c.childs
      .map((el) => {
        return this.mergeChilds(el)
      })
      .flat()
    element.append(...childsElements)
    this.elements.push({ ...c, el: element })

    return element
  }

  mergeChilds(el) {
    if (Array.isArray(el)) {
      return el.map((x) => this.mergeChilds(x))
    }
    return typeof el === 'string' ? document.createTextNode(el) : this.to(el)
  }
}

export const React = new Freack()
