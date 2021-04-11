import React from 'react'
import { ThemeProvider } from './hooks/theme'
import { LayoutProvider } from './hooks/layout'
import { LoadingProvider } from './hooks/loading'

export default ({ element }) => (
  <ThemeProvider>
    <LoadingProvider>
      <LayoutProvider>
        {element}
      </LayoutProvider>
    </LoadingProvider>
  </ThemeProvider>
)
