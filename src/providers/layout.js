import React, { createContext, useContext } from 'react'
import { PrintLayout } from '../layouts'

export const LayoutContext = createContext()

function defaultLayoutReducer(state, prop, payload) {
  return state[prop] !== payload
    ? Object.assign({}, state, { [prop]: payload })
    : state
}

export class LayoutProvider extends React.Component {
  layouts = {}
  enforcedLayout

  createDispatcher({ id, reducer = defaultLayoutReducer }){
    return (action, payload) => {
      const prev = this.layouts[id].state
      const state = reducer(prev, action, payload)
      if (prev !== state) {
        this.layouts[id] = Object.assign({}, this.layouts[id], { state })
        this.setState({})
      }
    }
  }

  setLayout(layout) {
    if (layout !== this.getLayout()) {
      this.enforcedLayout = layout
      this.setState({})
    }
  }

  setPrintLayout = enabled => this.setLayout(enabled ? PrintLayout : this.props.Layout)

  getLayout() {
    return this.enforcedLayout || this.props.Layout
  }

  render() {
    const { props: { children, Layout: SourceLayout }, layouts, setPrintLayout } = this
    const Layout = this.getLayout()
    const { id, state } = Layout
    let layout = layouts[id]
    if(!layout) {
      layout = layouts[id] = {
        id,
        Layout,
        state,
        dispatch: this.createDispatcher(Layout),
        setPrintLayout
      }
    }
    layout.isEnforced = Layout !== SourceLayout
    layout.isPrint = Layout === PrintLayout

    return (
      <LayoutContext.Provider value={layout}>
        {children}
      </LayoutContext.Provider>
    )
  }
}

export function useLayout() {
  return useContext(LayoutContext)
}

export function Layout({ not, id, print, enforced, children }) {
  const layout = useLayout()
  let assert = [id, print, enforced].reduce((acc, prop, i) => {
    if (prop !== undefined && acc !== false) {
      if (i === 0) acc = layout.id === prop
      if (i === 1) acc = layout.isPrint === !!prop
      if (i === 2) acc = layout.isEnforced === !!prop
    }
    return acc
  }, 0)

  if (assert === 0) {
    return children(layout)
  }

  const isArray = Array.isArray(children)
  assert = not ? !assert : assert
  const element = assert
    ? isArray ? children[0] : children
    : isArray ? children[1] : null

  if (element instanceof Function) {
    return element(layout)
  }

  return element
}
