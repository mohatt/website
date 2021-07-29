import React from 'react'

/**
 * We use this to prevent re-mounting Layout component on every route change.
 *  We aren't importing Layout directly to:
 *   - Let pages decide what layout to use
 *   - Better code splitting
 */
export function wrapPageElement({ element, props: { location } }) {
  const PageComponent = element.type
  if (PageComponent) {
    // Search for layout in page component type
    // Fallback to the default layout defined in parent component (if implemented)
    const { Layout } = PageComponent || Object.getPrototypeOf(PageComponent)
    if (Layout) {
      return (
        <Layout.Outer location={location}>
          <Layout>{element}</Layout>
        </Layout.Outer>
      )
    }
  }

  return element
}
