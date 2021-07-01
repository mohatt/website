import { withPrefix } from 'gatsby'

const GATSBY_PREFIX = withPrefix('/')
const PLATFORMS = {
  email: {
    title: 'Email',
    icon: 'email',
    href: handle => `mailto:${handle}`,
  },
  homepage: {
    title: 'Homepage',
    icon: 'globe',
    href: handle => handle,
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
  linkedin: {
    title: 'Linkedin',
    icon: 'linkedin',
    href: handle => `https://www.linkedin.com/in/${handle}`,
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

export function getPlatformHandle(platform, handle) {
  const props = PLATFORMS[platform]
  if (!props) {
    throw new Error(`Invalid social platform id "${platform}"`)
  }
  return {
    type: platform,
    ...props,
    href: props.href(handle),
  }
}
