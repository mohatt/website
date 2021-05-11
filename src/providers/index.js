import React from 'react'
import { AnalyticsProvider } from './analytics'
import { ThemeProvider } from './theme'

export default function Providers({ children }) {
  return (
    <AnalyticsProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AnalyticsProvider>
  )
}
