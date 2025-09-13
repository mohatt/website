import type { FC } from 'react'
import { networkHandles } from '../constants'
import Icon, { IconProps } from '../components/Icon'
import { createReactMap, ReactMapItemProps } from './ReactMap'

export interface NetworkHandleItem {
  id: string
  type: string
  handle: string
  title: string
  href: string
  Icon: FC<Omit<IconProps, 'name'>>
}

export function createNetworkHandle(id: string): NetworkHandleItem {
  const matches = id?.match(/^([^:]+):(.*)/)
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

export interface NetworkHandleProps extends ReactMapItemProps<string, NetworkHandleItem> {}

export function NetworkHandle({ item, index, children }: NetworkHandleProps) {
  return children(createNetworkHandle(item), index)
}

NetworkHandle.Map = createReactMap<string, {}, NetworkHandleItem>(function NetworkHandleMap(props) {
  return <NetworkHandle key={`${props.item}/${props.index}`} {...props} />
})
