const React = require('react')
const { THEME_LIST, THEME_STORAGE_KEY } = require('../src/commons')

/**
 * Provides a workaround for FOUC
 * This solves the flickering issue due to the fact that the server
 *  renders first and then the client comes in and does its change
 * @see ../src/hooks/is-client.js
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
module.exports = ({ setPreBodyComponents }) => {
  const themeSetup = `
try {
  let theme = JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}"))
  if(theme) {
    let themes = ${JSON.stringify(
      THEME_LIST.reduce((acc, theme) => {
        acc[theme.id] = theme.getClassName()
        return acc
      }, {})
    )}
    if (themes[theme]) {
      document.body.setAttribute("class", themes[theme])
    }
  }
} catch (e) {}
`

  setPreBodyComponents([
    <script key="theme-setup" dangerouslySetInnerHTML={{ __html: themeSetup }} />
  ])
}
