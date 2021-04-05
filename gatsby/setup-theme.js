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
(function() {
  let t
  try {
    t = localStorage.getItem("${THEME_STORAGE_KEY}")
    t = JSON.parse(t)
  } catch (e) {}
  if(t) {
    let themes = ${JSON.stringify(
      THEME_LIST.reduce((acc, theme) => {
        acc[theme.id] = theme.getClassName()
        return acc
      }, {})
    )}
    if (themes[t]) {
      document.body.setAttribute("class", themes[t])
    }
  }
})()
`

  setPreBodyComponents([
    <script key="theme-setup" dangerouslySetInnerHTML={{ __html: themeSetup }} />
  ])
}
