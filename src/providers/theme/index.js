import React, { useCallback, useEffect, useRef } from 'react'
import { ThemeState, defaultState, storageKey } from './themes'
import { useLocalStorage } from '../../hooks'
import { useAnalyticsCallback } from '../analytics'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const eventData = useRef()
  const [state, setState] = useLocalStorage(storageKey, defaultState.state)
  const theme = new ThemeState(state)

  useEffect(() => {
    document.body.setAttribute('class', theme.className)
    document.querySelector('meta[name=theme-color]').content = theme.color.colors.primary
  }, [state])

  useAnalyticsCallback(({ user, event }) => {
    user({ color_theme: state.color, edges_theme: state.edges })
    if (eventData.current) {
      event(...eventData.current)
    }
  }, [state])

  const cycle = useCallback(type => {
    const nextState = theme.cycle(type)
    eventData.current = [
      `change_${type}_theme`,
      { value: nextState[type], prev_value: theme.state[type] }
    ]
    setState(nextState)
  }, [state])

  return (
    <ThemeContext.Provider value={{ cycle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}
