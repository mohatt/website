import React from "react";

/**
 * We use this to prevent re-mounting Layout component on evry route change.
 *  We aren't importing Layout here for two reasons:
 *   - Letting pages decide what layout to use
 *   - Better code splitting
 */
export function wrapPageElement({ element }) {
  const PageComponent = element.type
  if (PageComponent) {
    // Search for layout in page component type
    // Fallback to the default layout defined in parent component (if implemented)
    const Layout = PageComponent.layout || Object.getPrototypeOf(PageComponent).layout
    if (Layout) {
      return <Layout>{element}</Layout>
    }
  }

  return element
}
