import { Fragment, ReactNode, FC } from 'react'

type WrapperRenderFn = (items: readonly ReactNode[]) => ReactNode
type ItemRenderFn<T> = (item: T, index: number) => ReactNode

export interface ReactMapItemProps<T, V = T> {
  item: T
  index: number
  children?: ItemRenderFn<V>
}

export type ReactMapProps<T, P = {}, V = T> = P & {
  data: readonly T[]
  limit?: number
  children?: readonly [WrapperRenderFn, ItemRenderFn<V>] | WrapperRenderFn
}

/**
 * A utility function that generates reusable, data-driven React components.
 * It maps over a list of items (data) and renders each item using a customizable render function,
 * with optional limits and wrapper logic. Supports passing shared props and index tracking.
 */
export function createReactMap<T, P = {}, V = T>(
  render: (props: P & ReactMapItemProps<T, V>) => ReactNode,
  defaults?: Partial<P> & { limit?: number },
): FC<ReactMapProps<T, P, V>> {
  const Comp: FC<ReactMapProps<T, P, V>> = function ReactMapComponent(props) {
    const { data, children, limit, ...itemProps } = {
      ...defaults,
      ...props,
    }

    const [wrapper, renderer] = Array.isArray(children)
      ? (children as [WrapperRenderFn, ItemRenderFn<V>])
      : [children as WrapperRenderFn]

    const items: ReactNode[] = []
    for (let index = 0; index < data?.length; index++) {
      if (items.length === limit) break
      const node = render({ ...(itemProps as P), item: data[index], children: renderer, index })
      if (node != null) items.push(node)
    }

    // Don't render wrapper if no items
    if (!items.length) return null
    return wrapper ? wrapper(items) : items
  }

  Comp.displayName = render.name || 'ReactMap'
  return Comp
}

/**
 * A default component created with createReactMap that simply renders each item in a list using
 * the provided child render function.
 * Optionally wraps the result with a parent element or layout.
 * Ideal for declarative iteration over arrays in JSX.
 */
export const ReactMap: (<T>(props: ReactMapProps<T>) => ReactNode) & Omit<FC, keyof Function> =
  createReactMap<any>(({ item, index, children }) => {
    return children ? children(item, index) : <Fragment key={index}>{item}</Fragment>
  })
