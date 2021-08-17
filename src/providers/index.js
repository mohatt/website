import React from 'react'
import { PathProvider } from './path'
import { AnalyticsProvider } from './analytics'
import { ThemeProvider } from './theme'
import { LayoutProvider } from './layout'

export default function Providers({ children, Layout, location }) {
  return (
    <PathProvider location={location}>
      <AnalyticsProvider location={location}>
        <ThemeProvider>
          <LayoutProvider Layout={Layout}>
            {children}
          </LayoutProvider>
        </ThemeProvider>
      </AnalyticsProvider>
    </PathProvider>
  )
}
