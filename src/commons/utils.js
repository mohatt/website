import { withPrefix } from 'gatsby'

const GATSBY_PREFIX = withPrefix('/')

export function withoutPrefix(path) {
  if (GATSBY_PREFIX === '/') {
    return path
  }
  return path.indexOf(GATSBY_PREFIX) === 0
    ? path.replace(GATSBY_PREFIX, '/')
    : path
}
