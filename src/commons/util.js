import { getActivatedRoute, getMatchingRoute } from 'gatsby-plugin-advanced-pages'

export const getCurrentRoute = () => {
  return getActivatedRoute() || getMatchingRoute('/404')
}

export const getContactHref = (name, contact) => {
  let href
  switch (name) {
    case 'twitter':
      href = `https://www.twitter.com/${contact}`
      break
    case 'github':
      href = `https://github.com/${contact}`
      break
    case 'email':
      href = `mailto:${contact}`
      break
    default:
      href = contact
      break
  }

  return href
}

export {}
