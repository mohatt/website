import React from 'react'
import { LayoutProvider } from './state'

export default ({ element }) => (
  <LayoutProvider>
    {element}
  </LayoutProvider>
)
