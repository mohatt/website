import React from 'react'
import { networkHandles } from '../constants'
import { Icon } from '../components'
import { createReactMap } from '.'

export function createNetworkHandle(id) {
  const matches = id && id.match(/^([^:]+):(.*)/)
  if (!matches) {
    throw new Error(`Invalid network handle id "${id}"`)
  }

  const [, type, handle] = matches
  const { title, icon, href } = networkHandles[type]
  if (!href) {
    throw new Error(`Invalid network handle type "${type}"`)
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

export function NetworkHandle({ id, children }) {
  return children(createNetworkHandle(id))
}

NetworkHandle.Map = createReactMap(function NetworkHandleMap(handle, { children }) {
  return <NetworkHandle key={handle} id={handle} children={children} />
})
