import React from 'react'
import { platformHandles } from '../constants'
import { Icon } from '../components'
import { createReactMap } from '.'

export function createPlatformHandle(id) {
  const matches = id && id.match(/^([^:]+):(.*)/)
  if (!matches) {
    throw new Error(`Invalid platform handle id "${id}"`)
  }

  const [, type, handle] = matches
  const { title, icon, href } = platformHandles[type]
  if (!href) {
    throw new Error(`Invalid platform handle type "${type}"`)
  }

  return {
    id,
    type,
    handle,
    title,
    href: href instanceof Function ? href(handle) : href.replace('%s', handle),
    Icon(props) {
      return <Icon name={icon} {...props} />
    },
  }
}

export function PlatformHandle({ id, children }) {
  return children(createPlatformHandle(id))
}

PlatformHandle.Map = createReactMap(function PlatformHandleMap(handle, { children }) {
  return <PlatformHandle key={handle} id={handle} children={children} />
})
