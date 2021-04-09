import React from 'react'
import { ThemeProvider } from './hooks/theme'
import { LayoutProvider } from './hooks/layout'

export default ({ element }) => (
  <ThemeProvider>
    <LayoutProvider>
      {element}
    </LayoutProvider>
  </ThemeProvider>
)
