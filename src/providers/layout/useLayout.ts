import { FC, ReactNode, createContext, useContext } from 'react'
import { DefaultLayout, PrintLayout } from '@/layouts'

export interface LayoutState {
  readonly [key: string]: any
}

export interface LayoutDefinition {
  Component: LayoutComponent
  state: LayoutState
  reducer?: (state: LayoutState, action: any) => LayoutState
}

export const LAYOUTS = {
  default: {
    Component: DefaultLayout,
    state: {
      menu: false,
    },
  },
  print: {
    Component: PrintLayout,
    state: {},
  },
} satisfies Record<string, LayoutDefinition>

export type LayoutMap = typeof LAYOUTS
export type LayoutId = keyof LayoutMap
export type LayoutComponent = FC<{ children: ReactNode }>

export interface LayoutContextValue {
  readonly id: LayoutId
  readonly Component: LayoutComponent
  readonly setLayout: (id: LayoutId) => void
  readonly isEnforced: boolean
  readonly isPrint: boolean
}

export const LayoutContext = createContext<LayoutContextValue>(undefined)

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) {
    throw new Error('useLayout must be used inside LayoutProvider')
  }
  return ctx
}
