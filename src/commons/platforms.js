import React from 'react'
import { Icon } from '../components'

const PLATFORMS = {
  email: {
    title: 'Email',
    icon: 'email',
    href: 'mailto:%s',
  },
  homepage: {
    title: 'Homepage',
    icon: 'globe',
    href: handle => /^(https?:)?\/\//.test(handle) ? handle : `https://${handle}`,
  },
  github: {
    title: 'Github Profile',
    icon: 'github',
    href: 'https://github.com/%s',
  },
  githubRepo: {
    title: 'Github Repository',
    icon: 'github',
    href: 'https://github.com/%s',
  },
  twitter: {
    title: 'Twitter Profile',
    icon: 'twitter',
    href: 'https://www.twitter.com/%s',
  },
  linkedin: {
    title: 'Linkedin Profile',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/%s',
  },
  npm: {
    title: 'NPM Package',
    icon: 'npm',
    href: 'https://www.npmjs.com/package/%s',
  },
  packagist: {
    title: 'Composer Package',
    icon: 'packagist',
    href: 'https://packagist.org/packages/%s',
  },
}

export function createPlatformHandle(id) {
  const matches = id && id.match(/^([^:]+):(.*)/)
  if (!matches) {
    throw new Error(`Invalid platform handle id "${id}"`)
  }

  const [, type, handle] = matches
  const props = PLATFORMS[type]
  if (!props) {
    throw new Error(`Invalid platform handle type "${type}"`)
  }

  return {
    id,
    type,
    ...props,
    href: typeof props.href === 'function'
      ? props.href(handle)
      : props.href.replace('%s', handle),
  }
}

export function PlatformHandle({ id, children }) {
  const handle = createPlatformHandle(id)
  handle.Icon = function PlatformHandleIcon(props) {
    return <Icon name={handle.icon} {...props} />
  }

  return children(handle)
}

PlatformHandle.Map = function PlatformHandleMap({ data, children }) {
  return data.map(id => <PlatformHandle key={id} id={id} children={children} />)
}
