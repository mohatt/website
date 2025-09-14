import type { GatsbySSR } from 'gatsby'
import type { ReactElement } from 'react'
import { themes, site } from './src/constants'
import { createThemeState } from './src/providers/theme'

/**
 * This should be baked into gatsby-plugin-react-helmet
 *
 * @see https://github.com/gatsbyjs/gatsby/issues/22206#issuecomment-710591572
 */
export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const order = ['title', 'base', 'meta', 'script', 'style', 'link', 'noscript'] as const
  const components = getHeadComponents() as Array<ReactElement<any, (typeof order)[number]>>
  replaceHeadComponents(
    components.flat().sort((x, y) => order.indexOf(x.type) - order.indexOf(y.type)),
  )
}

/**
 * Workaround for FOUC - solves the style flickering issue
 *
 * @see useMounted
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  const lookups = {
    c: themes.color.reduce((accu, t) => {
      accu[t.id] = [t.class, t.colors.primary]
      return accu
    }, {}),
    e: themes.edges.reduce((accu, t) => {
      accu[t.id] = t.class
      return accu
    }, {}),
  }
  const defaults = {
    ctLight: themes.color.find((t) => !t.dark),
    ctDark: themes.color.find((t) => t.dark),
    et: themes.edges[0].id,
  }
  const setupScript = `
let prefersDark = false
try {
  prefersDark = !!window.matchMedia("(prefers-color-scheme: dark)").matches
} catch (_) {}
let themes = ${JSON.stringify(lookups)},
  systemTheme = {
    color: prefersDark ? "${defaults.ctDark.id}" : "${defaults.ctLight.id}",
    edges: "${defaults.et}",
  },
  userTheme
try {
  userTheme = JSON.parse(localStorage.getItem("${site.themeStorageKey}"))
} catch (_) {}
let theme = userTheme || systemTheme,
  color = themes.c[theme.color],
  htmlEl = document.documentElement
htmlEl.className = color[0] + " " + themes.e[theme.edges]
document.head.querySelector("meta[name=theme-color]").content = color[1]
htmlEl.setAttribute("data-system-ct", systemTheme.color)
`
  setHtmlAttributes({ className: createThemeState().class })
  setHeadComponents([
    <script key='theme-setup' dangerouslySetInnerHTML={{ __html: setupScript }} />,
  ])
}

export { wrapPageElement } from './gatsby-browser'
