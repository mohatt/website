export function createReactMap(render, defaults = {}) {
  function ReactMap(props) {
    const { data, children, limit, ...itemProps } = Object.assign({}, defaults, props)
    const [wrapper, renderer] = Array.isArray(children) ? children : [children]
    itemProps.children = renderer

    let i = 0
    const items = []
    for (let item of data || []) {
      if (i === limit) {
        break
      }

      item = render(item, itemProps, i)
      if (item) {
        i = items.push(item)
      }
    }

    if (!i) {
      return null
    }

    return wrapper ? wrapper(items) : items
  }

  ReactMap.displayName = render.name
  return ReactMap
}

export const ReactMap = createReactMap(function ReactMap(item, { children }, i) {
  return children ? children(item, i) : item
})
