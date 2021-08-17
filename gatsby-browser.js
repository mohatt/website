import React from 'react'
import './src/css/index.css'

/**
 * We use this to prevent re-mounting Layout component on every route change.
 *  We aren't importing Layout directly to:
 *   - Let pages decide what layout to use
 *   - Better code splitting
 */
export function wrapPageElement({ element, props: { location } }) {
  const PageComponent = element.type
  if (PageComponent) {
    // Search for Layout and Providers in page component type
    // Fallback to defaults defined in parent component (if implemented)
    const { Layout, Providers } = PageComponent || Object.getPrototypeOf(PageComponent)
    if (Layout) {
      return (
        <Providers Layout={Layout} location={location}>
          {element}
        </Providers>
      )
    }
  }

  return element
}
