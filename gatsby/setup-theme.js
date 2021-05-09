const React = require('react')
const { THEME_DEFAULT, THEME_LIST, THEME_STORAGE_KEY } = require('../src/providers/theme/themes')

/**
 * Workaround for FOUC issue - solves the style flickering issue due to
 *  the fact that the server renders first and then the client comes in
 *  and does its change
 *
 * @see ../src/hooks/is-client.js
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
module.exports = ({ setPreBodyComponents, setBodyAttributes }) => {
  const themeSetup = `
try {
  let theme = JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}"))
  if(theme) {
    let themes = ${JSON.stringify(
      THEME_LIST.reduce((obj, theme) => {
        obj[theme.id] = [theme.getClassName(), theme.colors.primary]
        return obj
      }, {})
    )}
    theme = themes[theme]
    if (theme) {
      document.body.setAttribute("class", theme[0])
      document.querySelector("meta[name=theme-color]").content = theme[1]
    }
  }
} catch (e) {}
`
  setBodyAttributes({ className: THEME_DEFAULT.getClassName()})
  setPreBodyComponents([
    <script key="theme-setup" dangerouslySetInnerHTML={{ __html: themeSetup }} />
  ])
}
