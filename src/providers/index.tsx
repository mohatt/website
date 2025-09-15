import type { ReactNode } from 'react'
import { PathProvider } from './path'
import { AnalyticsProvider } from './analytics'
import { ThemeProvider } from './theme'
import LayoutStateProvider from './layout/LayoutStateProvider'

export interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <PathProvider>
      <AnalyticsProvider>
        <ThemeProvider>
          <LayoutStateProvider>{children}</LayoutStateProvider>
        </ThemeProvider>
      </AnalyticsProvider>
    </PathProvider>
  )
}
