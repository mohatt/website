import { Component, createContext, useContext } from 'react'
import { PrintLayout } from '../layouts'

export const LayoutContext = createContext()

function defaultLayoutReducer(state, prop, payload) {
  return state[prop] !== payload ? { ...state, [prop]: payload } : state
}

export class LayoutProvider extends Component {
  layouts = {}
  enforcedLayout

  createDispatcher({ id, reducer = defaultLayoutReducer }) {
    return (action, payload) => {
      const prev = this.layouts[id].state
      const state = reducer(prev, action, payload)
      if (prev !== state) {
        this.layouts[id] = { ...this.layouts[id], state }
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

  setPrintLayout = (enabled) => this.setLayout(enabled ? PrintLayout : this.props.Layout)

  getLayout() {
    return this.enforcedLayout || this.props.Layout
  }

  render() {
    const {
      props: { children, Layout: SourceLayout },
      layouts,
      setPrintLayout,
    } = this
    const Layout = this.getLayout()
    const { id, state } = Layout
    let layout = layouts[id]
    if (!layout) {
      layout = layouts[id] = {
        id,
        Layout,
        state,
        dispatch: this.createDispatcher(Layout),
        setPrintLayout,
      }
    }
    layout.isEnforced = Layout !== SourceLayout
    layout.isPrint = Layout === PrintLayout

    return <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
  }
}

export function useLayout() {
  return useContext(LayoutContext)
}
