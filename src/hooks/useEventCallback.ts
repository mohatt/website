import { useRef } from 'react'
import { useEnhancedEffect } from './useEnhancedEffect'

/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */
export function useEventCallback<
  Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown,
>(fn: Fn): Fn

export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return

export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  const fnRef = useRef(fn)

  useEnhancedEffect(() => {
    fnRef.current = fn
  })

  const callbackRef = useRef((...args: Args) => {
    return (0, fnRef.current)(...args)
  })

  return callbackRef.current
}
