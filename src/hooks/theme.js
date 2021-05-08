import React, { useEffect, useRef } from 'react'
import { THEME_DEFAULT, THEME_LIST, THEME_STORAGE_KEY } from '../commons/themes'
import { useAnalyticsEffect, useLocalStorage } from '.'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, THEME_DEFAULT.id)
  const themeConfig = THEME_LIST.find(t => t.id === theme)

  const prevThemeRef = useRef()
  const prevTheme = prevThemeRef.current

  useEffect(() => {
    document.body.setAttribute('class', themeConfig.getClassName())
    document.querySelector('meta[name=theme-color]').content = themeConfig.colors.primary
  }, [theme])

  useAnalyticsEffect(({ event, user }) => {
    user('app_theme', theme)
    if (prevTheme) {
      event('app_change_theme', {
        theme: theme,
        prev_theme: prevTheme
      })
    }
  }, [theme])

  const cycleTheme = () => {
    const i = THEME_LIST.indexOf(themeConfig)
    if (i !== -1) {
      setTheme(prev => {
        prevThemeRef.current = prev
        return THEME_LIST[(i + 1) % THEME_LIST.length].id
      })
    }
  }

  return (
    <ThemeContext.Provider value={{ cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  return React.useContext(ThemeContext)
}
