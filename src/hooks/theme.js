import React, { useEffect } from 'react'
import { THEME_DEFAULT, THEME_LIST, THEME_STORAGE_KEY } from '../commons/themes'
import { useLocalStorage } from '.'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, THEME_DEFAULT.id)
  const themeConfig = THEME_LIST.find(t => t.id === theme)

  useEffect(() => {
    document.body.setAttribute('class', themeConfig.getClassName())
    document.querySelector('meta[name=theme-color]').content = themeConfig.colors.primary
  }, [themeConfig])

  const cycleTheme = () => {
    const i = THEME_LIST.indexOf(themeConfig)
    if (i !== -1) {
      setTheme(THEME_LIST[(i + 1) % THEME_LIST.length].id)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  return React.useContext(ThemeContext)
}
