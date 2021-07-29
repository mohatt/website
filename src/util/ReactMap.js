export function createReactMap(render) {
  function ReactMap({ data, limit, children, ...props }) {
    const [wrapper, renderer] = Array.isArray(children) ? children : [children]
    props.children = renderer

    let i = 0
    const items = []
    for (let item of data || []) {
      if (i === limit) {
        break
      }

      item = render(item, props, i)
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
