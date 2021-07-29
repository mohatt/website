import React from 'react'
import { PathProvider } from './path'
import { AnalyticsProvider } from './analytics'
import { ThemeProvider } from './theme'

export default function Providers({ children, location }) {
  return (
    <PathProvider location={location}>
      <AnalyticsProvider location={location}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AnalyticsProvider>
    </PathProvider>
  )
}
