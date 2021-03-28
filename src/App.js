import React from 'react'

/**
 * We use this context to persist data across pages without
 * using wrapPageElement to wrap page components with <Layout>
 */
const AppStateContext = React.createContext()
AppStateContext.displayName = 'App'

// Color themes
const THEME_DEFAULT = 'default'
const THEME_STORAGE_KEY = 'mohatt:theme'
const THEME_NEXT = {
  [THEME_DEFAULT]: 'breeze',
  breeze: THEME_DEFAULT,
}

function getInitialTheme()  {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY)
    if (THEME_NEXT[theme]) {
      return theme
    }
  } catch (err) {}
  return THEME_DEFAULT
}

export function AppStateProvider({ children }) {
  const [theme, setTheme] = React.useState(getInitialTheme())
  const [menuOpen, setMenuOpen] = React.useState(false)

  const rotateTheme = () => {
    setTheme(THEME_NEXT[theme])
  }

  React.useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return (
    <AppStateContext.Provider value={{ theme, menuOpen, rotateTheme, setMenuOpen }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default () => React.useContext(AppStateContext)
