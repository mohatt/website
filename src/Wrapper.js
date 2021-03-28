import React from 'react'
import { AppStateProvider } from './App'

export default ({ element }) => (
  <AppStateProvider>
    {element}
  </AppStateProvider>
)
