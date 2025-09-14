import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { useLayout, LayoutState, LayoutDefinition, LayoutId, LAYOUTS } from './useLayout'
import {
  LayoutStateContext,
  LayoutStateContextValue,
  DefaultAction,
  DispatcherOf,
} from './useLayoutState'

// Factory for the default state reducer (captures initialState for RESET)
const createDefaultReducer = <S extends LayoutState>(initialState: S) => {
  return (state: S, action: DefaultAction<S>): S => {
    switch (action.type) {
      case 'SET':
        return { ...state, ...action.payload }
      case 'RESET':
        return initialState
      default:
        return state
    }
  }
}

export interface LayoutStateProviderProps {
  children: ReactNode
}

export default function LayoutStateProvider({ children }: LayoutStateProviderProps) {
  const { id, Component } = useLayout()
  const def = LAYOUTS[id] as LayoutDefinition

  // Registry of { state, reducer } per layout
  const registry = useRef(
    {} as Record<LayoutId, Required<Pick<LayoutDefinition, 'state' | 'reducer'>>>,
  )

  // Ensure the current layout is initialized
  if (!registry.current[id]) {
    const initialState = def.state ?? {}
    registry.current[id] = {
      state: initialState,
      reducer: def.reducer ?? createDefaultReducer(initialState),
    }
  }

  // Forces re-render when the current state changes
  const [, setTick] = useState(0)

  const dispatch = useCallback<DispatcherOf<any>>(
    (action) => {
      const entry = registry.current[id]
      const nextState = entry.reducer(entry.state, action)
      if (nextState !== entry.state) {
        entry.state = nextState
        setTick((x) => x + 1)
      }
    },
    [id],
  )

  const value = useMemo<LayoutStateContextValue>(
    () => ({ id, state: registry.current[id].state, dispatch }),
    [id, dispatch],
  )

  return (
    <LayoutStateContext.Provider value={value}>
      <Component>{children}</Component>
    </LayoutStateContext.Provider>
  )
}
