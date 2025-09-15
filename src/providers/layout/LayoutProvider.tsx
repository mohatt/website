import { ReactNode, useMemo, useState } from 'react'
import { LayoutContext, LayoutContextValue, LayoutId, LAYOUTS } from './useLayout'

export interface LayoutProviderProps {
  layout: LayoutId
  children: ReactNode
}

export default function LayoutProvider({ layout: initialLayout, children }: LayoutProviderProps) {
  const [layout, setLayout] = useState(initialLayout)

  const value = useMemo<LayoutContextValue>(
    () => ({
      id: layout,
      Component: LAYOUTS[layout].Component,
      setLayout,
      isEnforced: layout !== initialLayout,
      isPrint: layout === 'print',
    }),
    [layout, initialLayout],
  )

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
