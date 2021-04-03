const React = require('react')
const { THEME_LIST, THEME_STORAGE_KEY } = require('../src/commons')

/**
 * Workaround for Gatsby’s rehydration issue
 * This solves the flickering issue due to the fact that the server
 *  renders first and then the client comes in and does its change
 * @see ../src/hooks/is-client.js
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 */
module.exports = ({ setPreBodyComponents }) => {
  const ThemeSetter = React.createElement('script', {
    key: 'ThemeSetter',
    dangerouslySetInnerHTML: {
      __html: `
(function() {
  let t;
  try { t = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch (e) {};
  if(t) {
    let l = ${JSON.stringify(Object.fromEntries(
        THEME_LIST.map(theme => [theme.id, theme.getClassName()])
      ))};
    l[t] && document.body.setAttribute("class", l[t]);
  }
})()
`
    }
  })

  setPreBodyComponents([ThemeSetter])
}
