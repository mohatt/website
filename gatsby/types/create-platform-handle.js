const github = {
  icon: 'github',
  href: handle => `https://github.com/${handle}`,
}

const platforms = {
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
    title: 'Github Profile',
    ...github,
  },
  'github/repo': {
    title: 'Github Repository',
    ...github,
  },
  twitter: {
    title: 'Twitter Profile',
    icon: 'twitter',
    href: handle => `https://www.twitter.com/${handle}`,
  },
  linkedin: {
    title: 'Linkedin Profile',
    icon: 'linkedin',
    href: handle => `https://www.linkedin.com/in/${handle}`,
  },
  npm: {
    title: 'NPM Package',
    icon: 'npm',
    href: handle => `https://www.npmjs.com/package/${handle}`,
  },
  packagist: {
    title: 'Composer Package',
    icon: 'packagist',
    href: handle => `https://packagist.org/packages/${handle}`,
  },
}

module.exports = function createPlatformHandle (id) {
  if (!id) {
    return null
  }

  const matches = id.match(/([^:]+):(.*)/)
  if (!matches) {
    throw new Error(`Invalid platform handle id "${id}"`)
  }

  const [, type, handle] = matches
  const props = platforms[type]
  if (!props) {
    throw new Error(`Invalid platform handle type "${type}"`)
  }

  return {
    id,
    type,
    ...props,
    href: props.href(handle),
  }
}
