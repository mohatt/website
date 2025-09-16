import type { FC } from 'react'
import { networkHandles, NetworkHandleType } from '@/constants'
import Icon, { IconProps } from '@/components/Icon'
import { createReactMap, ReactMapItemProps } from './ReactMap'

export type NetworkHandleId = `${NetworkHandleType}:${string}`

export interface NetworkHandleItem {
  id: NetworkHandleId
  type: NetworkHandleType
  handle: string
  title: string
  href: string
  Icon: FC<Omit<IconProps, 'name'>>
}

export function createNetworkHandle(input: string | NetworkHandleId): NetworkHandleItem {
  const matches = input?.match(/^([^:]+):(.*)/) as [NetworkHandleId, NetworkHandleType, string]
  if (!matches) {
    throw new Error(`Invalid network handle id "${input}"`)
  }

  const [id, type, handle] = matches
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

export interface NetworkHandleProps
  extends ReactMapItemProps<string | NetworkHandleId, NetworkHandleItem> {}

export function NetworkHandle({ item, index, children }: NetworkHandleProps) {
  return children(createNetworkHandle(item), index)
}

NetworkHandle.Map = createReactMap<string | NetworkHandleId, {}, NetworkHandleItem>(
  function NetworkHandleMap(props) {
    return <NetworkHandle key={`${props.item}/${props.index}`} {...props} />
  },
)
