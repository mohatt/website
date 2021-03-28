import React from 'react'

/**
 * We use this context to persist data across pages without
 * using wrapPageElement to wrap page components with <Layout>
 */
const AppStateContext = React.createContext()
AppStateContext.displayName = 'App'

export function AppStateProvider({ children }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <AppStateContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default () => React.useContext(AppStateContext)
