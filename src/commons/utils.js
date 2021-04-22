import { withPrefix } from 'gatsby'

const GATSBY_PREFIX = withPrefix('/')
const SOCIAL_PLATFORMS = {
  email: {
    title: 'Email',
    icon: 'email',
    href: handle => `mailto:${handle}`,
  },
  github: {
    title: 'Github',
    icon: 'github',
    href: handle => `https://github.com/${handle}`,
  },
  twitter: {
    title: 'Twitter',
    icon: 'twitter',
    href: handle => `https://www.twitter.com/${handle}`,
  },
}

export function withoutPrefix(path) {
  if (GATSBY_PREFIX === '/') {
    return path
  }
  return path.indexOf(GATSBY_PREFIX) === 0
    ? path.replace(GATSBY_PREFIX, '/')
    : path
}

export function getSocialHandle(platform, handle) {
  const props = SOCIAL_PLATFORMS[platform]
  if (!props) {
    throw new Error(`Invalid social handle "${platform}"`)
  }
  return {
    ...props,
    href: props.href(handle)
  }
}
