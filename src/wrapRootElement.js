import React from 'react'
import { LayoutProvider } from './components/Layout'

export default ({ element }) => (
  <LayoutProvider>
    {element}
  </LayoutProvider>
)
