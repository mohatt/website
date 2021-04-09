import React, { useState } from 'react'

/**
 * We use this context to persist layout state across pages without
 * using wrapPageElement to wrap page components with <Layout>
 */
const LayoutContext = React.createContext()

export function LayoutProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <LayoutContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default function useLayout() {
  return React.useContext(LayoutContext)
}
