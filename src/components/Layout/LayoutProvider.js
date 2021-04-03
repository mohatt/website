import React from 'react'
import { THEME_LIST, THEME_STORAGE_KEY } from '../../commons/themes'
import { useSiteMetadata } from '../../hooks'

/**
 * We use this context to persist layout state across pages without
 * using wrapPageElement to wrap page components with <Layout>
 */
const LayoutContext = React.createContext()

function getUserTheme()  {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY)
    if (THEME_LIST.find(t => t.id === theme)) {
      return theme
    }
  } catch (err) {}
}

function setUserTheme(theme)  {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (err) {}
}

export function LayoutProvider({ children }) {
  const defaultTheme = useSiteMetadata().theme
  const [theme, setTheme] = React.useState(getUserTheme() || defaultTheme)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const themeConfig = THEME_LIST.find(t => t.id === theme)

  const cycleTheme = () => {
    const i = THEME_LIST.indexOf(themeConfig)
    if (i !== -1) {
      setTheme(THEME_LIST[(i + 1) % THEME_LIST.length].id)
    }
  }

  React.useEffect(() => setUserTheme(theme), [theme])

  return (
    <LayoutContext.Provider value={{ theme, themeConfig, menuOpen, cycleTheme, setMenuOpen }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return React.useContext(LayoutContext)
}
