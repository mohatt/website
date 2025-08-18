import React from 'react'
import { themes, site } from './src/constants'
import { createThemeState } from './src/providers/theme'

/**
 * This should be baked into gatsby-plugin-react-helmet
 *
 * @see https://github.com/gatsbyjs/gatsby/issues/22206#issuecomment-710591572
 */
export function onPreRenderHTML({ getHeadComponents, replaceHeadComponents }) {
  const order = ['title', 'base', 'meta', 'script', 'style', 'link', 'noscript']
  replaceHeadComponents(
    getHeadComponents().flat().sort((x, y) => order.indexOf(x.type) - order.indexOf(y.type))
  )
}

/**
 * Workaround for FOUC - solves the style flickering issue
 *
 * @see useMounted
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
function setupTheme({ setHeadComponents, setHtmlAttributes }) {
  const lookups = {
    c: themes.color.reduce((acc, t) => (acc[t.id] = [t.class, t.colors.primary], acc), {}),
    e: themes.edges.reduce((acc, t) => (acc[t.id] = t.class, acc), {}),
  }
  const defaults = {
    ctLight: themes.color.find(t => !t.dark),
    ctDark: themes.color.find(t => t.dark),
    et: themes.edges[0].id
  }
  const __html = `
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
htmlEl.setAttribute("class", color[0] + " " + themes.e[theme.edges])
document.querySelector("meta[name=theme-color]").content = color[1]
htmlEl.setAttribute("data-system-ct", systemTheme.color)
`
  setHtmlAttributes({ className: createThemeState().class })
  setHeadComponents([
    <script key='theme-setup' dangerouslySetInnerHTML={{ __html }} />
  ])
}

export function onRenderBody(args) {
  setupTheme(args)
}

export { wrapPageElement } from './gatsby-browser'
