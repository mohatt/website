import type { GatsbyBrowser } from 'gatsby'
import './src/css/index.css'

/**
 * We use this to prevent re-mounting Layout component on every route change.
 *  We aren't importing Layout directly to:
 *   - Let pages decide what layout to use
 *   - Better code splitting
 */
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props: { location },
}) => {
  let PageComponent = element.type as any
  if (PageComponent) {
    // MDX pages are wrapped in a GatsbyMDXWrapper component,
    // so we need to access the wrapped element
    if (element.props.pageContext?.frontmatter) {
      PageComponent = PageComponent().type
    }
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
