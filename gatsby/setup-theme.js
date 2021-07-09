const React = require('react')
const { defaultState, themes, storageKey } = require('../src/providers/theme/themes')

/**
 * Workaround for FOUC - solves the style flickering issue due to the fact that the
 *  server renders first and then the client comes in and does its change.
 *
 * @see ../src/hooks/utils.js#useIsBrowser
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
module.exports = ({ setPreBodyComponents, setBodyAttributes }) => {
  const themeSetup = `
try {
  const theme = JSON.parse(localStorage.getItem("${storageKey}"))
  if(theme) {
    const themes = ${JSON.stringify({
      c: themes.color.reduce((acc, th) => (acc[th.id] = [th.className, th.colors.primary], acc), {}),
      e: themes.edges.reduce((acc, th) => (acc[th.id] = th.className, acc), {})
    })},
    color = themes.c[theme.color]
    document.body.setAttribute("class", color[0] + " " + themes.e[theme.edges])
    document.querySelector("meta[name=theme-color]").content = color[1]
  }
} catch (e) {}
`
  setBodyAttributes({ className: defaultState.className})
  setPreBodyComponents([
    <script key="theme-setup" dangerouslySetInnerHTML={{ __html: themeSetup }} />
  ])
}
