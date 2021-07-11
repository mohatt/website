import React from 'react'
import { Icon } from '../components'

const platforms = {
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

export function PlatformHandleObject(id) {
  const matches = id && id.match(/^([^:]+):(.*)/)
  if (!matches) {
    throw new Error(`Invalid platform handle id "${id}"`)
  }

  const [, type, handle] = matches
  const { title, icon, href } = platforms[type]
  if (!href) {
    throw new Error(`Invalid platform handle type "${type}"`)
  }

  return {
    id,
    type,
    title,
    href: href instanceof Function ? href(handle) : href.replace('%s', handle),
    Icon(props) {
      return <Icon name={icon} {...props} />
    },
  }
}

export function PlatformHandle({ id, children }) {
  return children(new PlatformHandleObject(id))
}

PlatformHandle.Map = function PlatformHandleMap({ data, children }) {
  return data.map(id => <PlatformHandle key={id} id={id} children={children} />)
}
