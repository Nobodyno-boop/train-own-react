class Freak {
  constructor(debug = true) {
    this.elements = []
    this.tree = []
    this.states = []
    this.currentId = ''
    this.count = 0
    this.base = ''
    this.baseJsx = null
    this.container = null
    this.refreshMode = false
    this.frags = {}
    this._frag = ''
    this.debug = debug
  }

  id() {
    return Math.random().toString(36).slice(2, 7)
  }

  el(tag, props, ...childs) {
    let id = '-42'
    if (this.currentId !== '') {
      id = this.currentId
    } else {
      this.currentId = this.id()
      id = this.currentId
    }
    let frag = this._frag

    let data = {
      node: tag,
      props: { ...props, __id: id, __frag: frag } ?? {},
      childs: childs ?? [],
      _t: tag,
      id: id,
      parent: '',
      frag: frag,
    }

    if (typeof tag === 'function') {
      console.group(tag.name)
      let frid = ''
      if (this.refreshMode) {
        if (props?.__frag) {
          let sp = props.__frag.split('#')
          frid = sp[1]
          this._frag = props.__frag
        }
      } else {
        this.currentId = this.id()
        frid = this.id()
        this._frag = tag.name + '#' + frid
      }
      let tree = tag(props, childs)
      this._frag = ''
      this.frags[tag.name] ?? (this.frags[tag.name] = [])
      this.frags[tag.name].push({ id: frid, tree: tree, _t: tag })
      console.groupEnd()
      return tree
    }
    this.currentId = ''
    return data
  }

  render(tag, container) {
    this.container = container
    this.baseJsx = tag
    console.group('start')
    this.currentId = this.id()
    let tree = tag({})

    if (tree.childs.length === 0) {
      tree._t = jsx
    }
    console.log(tree)

    tree.childs.flat().map((x) => this.patchParent(x, tree.id))
    this.tree = tree
    let element = this.toElement(tree)

    console.groupEnd()

    container.replaceChildren(element)
  }

  patchParent(childs, id) {
    if (typeof childs === 'object') {
      childs.parent = id
      if (childs?.childs) {
        return childs.childs.flat().map((x) => this.patchParent(x, childs.id))
      }
      return childs
    }
  }

  toElement(tree, parent) {
    if (typeof tree === 'object' && tree._n) {
      let data = tree.data()
      let fn = tree.fn(data)
      let els = fn.map((x) => this.toElement(x))

      return els
    } else if (typeof tree.node === 'undefined') {
      return document.createTextNode(tree)
    }

    let element = document.createElement(tree.node)
    let props = tree.props

    for (let name in props) {
      if (name && props.hasOwnProperty(name)) {
        let value = props[name]
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value != null) {
          // add support onClick onChange etc
          if (name.startsWith('on') && name.toLowerCase() in window) {
            element.addEventListener(name.toLowerCase().substr(2), (e) =>
              value(e)
            )
          } else {
            if (name.startsWith('__')) {
              if (!this.debug) continue
              if (typeof value === 'function') {
                element.setAttribute(name, value(tree.id))
              } else element.setAttribute(name, value.toString())
            } else {
              if (typeof value === 'function') {
                element.setAttribute(name, value(tree.id))
              } else element.setAttribute(name, value.toString())
            }
          }
        }
      }
    }
    let childsElements = tree.childs
      .map((el) => this.mergeChilds(el, { ...tree, el: element }))
      .flat()
    element.append(...childsElements)
    if (!this.refreshMode) {
      this.elements.push({ ...tree, el: element })
    }

    return element
  }

  mergeChilds(tree, parent) {
    if (Array.isArray(tree)) {
      return tree.map((x) => this.mergeChilds(x))
    }
    if (typeof tree === 'function') {
      // path useState
      return document.createTextNode(tree(parent.id))
    }

    return typeof tree === 'string'
      ? document.createTextNode(tree)
      : this.toElement(tree, parent)
  }

  /** STATE */

  registerState(def) {
    if (this.currentId !== '') {
      let data = {
        id: this.id(),
        el: this.currentId,
        value: def,
      }

      this.states.push(data)

      return data
    }
  }

  getState(id, patch) {
    let state = this.states.find((x) => x.id === id)
    if (patch !== '') {
      state.el = patch
    }

    return state ? state.value : ''
  }

  getParent(el) {
    return this.tree.childs.find((x) => this._getParent(x, el, this.tree))
  }

  setState(id, value) {
    this.refreshMode = true
    let state = this.states.find((x) => x.id === id)
    if (state) {
      state.value = value
      let tee = this.elements.find((x) => x.id === state.el)

      if (tee.frag !== '') {
        let sp = tee.frag.split('#')
        let p = this.frags[sp[0]]
        if (p) {
          let frag = p.find((x) => (x.id = sp[1]))
          let el = this.elements.find((x) => x.id === frag.tree.id)
          if (el) {
            console.log(el)
            let n = this.toElement(frag.tree)
            console.log(n)
            el.el.replaceChildren(n)
          }
        }
      } else {
        let el = this.toElement(tee)
        tee.el.replaceChildren(el)
      }
    }
    this.refreshMode = false
  }

  isInsideFrag(frag) {}
}

export const Fr = new Freak()
