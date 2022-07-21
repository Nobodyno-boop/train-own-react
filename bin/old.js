// JSX Polifill
//based on
const React = {
  stage: [],
  currentTag: '',
  tagChilds: [],
  createMultiTag: function (tag, attrs, children) {
    if (this.currentTag === '') {
      this.currentTag = tag.name
    } else this.stage.push(tag.name)
    console.group(tag.name)
    console.log(this.stage)
    let c = tag(attrs, children)

    console.log(this.tagChilds)
    this.currentTag = ''
    this.tagChilds = []
    console.log(c)
    console.groupEnd()
    return c
  },
  createElement: function (tag, attrs, ...children) {
    // if tag is function like <Page name="Pierre" /> === Page(props, ...)
    if (typeof tag === 'function') {
      return this.createMultiTag(tag, attrs, ...children)
    }

    var element = document.createElement(tag)
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name]
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value != null) {
          // add support onClick onChange etc
          if (name.startsWith('on') && name.toLowerCase() in window) {
            element.addEventListener(name.toLowerCase().substr(2), value)
          } else element.setAttribute(name, value.toString())
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i]
      /**
       *
       *
       * Example with basic html but work with jsx component:
       * let a [1,2,3];
       *
       * const j = () => {
       *   return (
       *    <ul>
       *      {a.map(x => <li>x</li>)}
       *   </ul>
       *  )
       * }
       *
       * */
      if (Array.isArray(child)) {
        element.append(...child)
      } else {
        // console.group("b");
        // console.log(element);
        // console.log(typeof child.nodeType === "undefined");
        // console.log(child.nodeType);
        // console.log(child.toString());
        // console.groupEnd()
        element.appendChild(
          typeof child.nodeType === 'undefined'
            ? document.createTextNode(child.toString())
            : child
        )
      }
    }
    if (this.currentTag !== '') {
      console.log(tag)
      this.tagChilds.push(element)
    }
    return element
  },
}
