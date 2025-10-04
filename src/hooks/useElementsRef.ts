import { MutableRefObject, useRef } from 'react'

type UseElementsRefResult<T extends HTMLElement = HTMLElement> = [
  /**
   * Map of DOM node refs identified by an auto-created key or custom one.
   */
  MutableRefObject<{ readonly [K: string | number]: T }>,

  /**
   * Creates a memoized callback ref for a DOM node.
   * If you expect the rendering order of nodes to change, use a custom key.
   *
   * @param customKey Key used to set/unset the node ref.
   */
  (customKey?: string | number) => (el?: T) => void,
]

/**
 * Hook that creates callback refs to manage DOM node refs of multiple elements.
 * Ensures refs remain stable even with re-renders. Use custom keys if the rendering order may change.
 */
export const useElementsRef = <T extends HTMLElement = HTMLElement>(): UseElementsRefResult<T> => {
  const elementRefs = useRef({
    current: {} as { [K: string | number]: T },
    callbacks: {} as Record<string | number, (el?: T) => void>,
  })

  // Resets index on every render; stable refs as long as the render order remains unchanged
  let currentIndex = 0

  return [
    elementRefs.current,
    (customKey) => {
      const { current: elements, callbacks } = elementRefs.current
      const autoKey = currentIndex++
      const key = customKey ?? autoKey

      // Memoize callback for stable ref assignment
      if (!callbacks[key]) {
        callbacks[key] = (el) => {
          // React is setting the ref for this node
          if (el != null) {
            elements[key] = el
            return
          }

          // React is clearing the node ref
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete elements[key]
        }
      }

      return callbacks[key]
    },
  ]
}
