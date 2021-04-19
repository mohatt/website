import React from 'react'
import { ThemeProvider } from './hooks/theme'

export default ({ element }) => (
  <ThemeProvider>
    {element}
  </ThemeProvider>
)
