import { createContext, useContext, Dispatch } from 'react'
import type { LayoutDefinition, LayoutState, LayoutMap, LayoutId } from './useLayout'

// If a layout declares a reducer, use its action type; otherwise fallback
export type ActionOf<K extends LayoutDefinition> = K['reducer'] extends (
  state: LayoutState,
  action: infer A,
) => LayoutState
  ? A
  : DefaultAction<K['state']>

// State dispatcher per layout
export type DispatcherOf<K extends LayoutDefinition> = Dispatch<ActionOf<K>>

// Fallback actions if no custom reducer is provided
export type DefaultAction<S extends LayoutState> =
  | { type: 'SET'; payload: Partial<Readonly<S>> }
  | { type: 'RESET' }

// Context value interface (union across all layouts)
export interface LayoutStateContextValue<
  K extends LayoutId = LayoutId,
  S extends LayoutDefinition = LayoutMap[K],
> {
  readonly id: K
  readonly state: Readonly<S['state']>
  readonly dispatch: DispatcherOf<S>
}

export const LayoutStateContext = createContext<LayoutStateContextValue>(undefined)

export function useLayoutState<K extends LayoutId = LayoutId>() {
  const ctx = useContext(LayoutStateContext)
  if (!ctx) {
    throw new Error('useLayoutState must be used inside LayoutStateProvider')
  }
  return ctx as LayoutStateContextValue<K>
}
