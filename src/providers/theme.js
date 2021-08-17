import React, { createContext, useContext, useRef } from 'react'
import { $document, themes, site } from '../constants'
import { useAnalyticsCallback, useLocalStorage } from '../hooks'

export function createThemeState({ color, edges } = {}) {
  color = color && themes.color.find(t => t.id === color) || themes.color[0]
  edges = edges && themes.edges.find(t => t.id === edges) || themes.edges[0]
  return {
    color,
    edges,
    state: {
      color: color.id,
      edges: edges.id,
    },
    class: color.class + ' ' + edges.class,
    cycle(type) {
      const list = themes[type]
      const next = list[(list.indexOf(this[type]) + 1) % list.length].id
      return createThemeState(Object.assign({}, this.state, { [type]: next }))
    },
  }
}

function themeStateNormalizer(state, initial) {
  return initial ? createThemeState(state) : state.state
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const eventData = useRef()
  const [theme, setTheme] = useLocalStorage(site.themeStorageKey, undefined, themeStateNormalizer)

  useAnalyticsCallback(({ user, event }) => {
    user({ color_theme: theme.color.id, edges_theme: theme.edges.id })
    if (eventData.current) {
      event.apply(undefined, eventData.current)
    }
  }, [theme])

  function cycle(type) {
    const next = theme.cycle(type)
    $document.documentElement.setAttribute('class', next.class)
    $document.querySelector('meta[name=theme-color]').content = next.color.colors.primary
    eventData.current = [`change_${type}_theme`, {
      value: next[type].id,
      prev_value: theme[type].id
    }]
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={cycle}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
