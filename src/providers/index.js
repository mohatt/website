import React from 'react'
import { FirebaseProvider } from './firebase'
import { ThemeProvider } from './theme'

export default function Providers({ children }) {
  return (
    <FirebaseProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </FirebaseProvider>
  )
}
