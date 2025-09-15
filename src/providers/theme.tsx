import { createContext, useContext, useCallback, useRef, ReactNode } from 'react'
import { $document, themes, site } from '@/constants'
import { useAnalyticsEffect, useLocalStorage } from '@/hooks'

type ThemeConstraint = keyof typeof themes
type ThemeCycleFn = (type: ThemeConstraint) => void
type SerializedThemeState = Partial<Record<ThemeConstraint, string>>
interface ThemeState {
  color: (typeof themes.color)[number]
  edges: (typeof themes.edges)[number]
  state: SerializedThemeState
  class: string
  cycle: (type: ThemeConstraint) => ThemeState
}

export function createThemeState(ids?: SerializedThemeState): ThemeState {
  const color = (ids?.color && themes.color.find((t) => t.id === ids.color)) || themes.color[0]
  const edges = (ids?.edges && themes.edges.find((t) => t.id === ids.edges)) || themes.edges[0]
  return {
    color,
    edges,
    state: {
      color: color.id,
      edges: edges.id,
    },
    class: color.class + ' ' + edges.class,
    cycle(type: ThemeConstraint) {
      const list = themes[type]
      const next = list[(list.indexOf(this[type]) + 1) % list.length].id
      return createThemeState({ ...this.state, [type]: next })
    },
  }
}

const themeStateNormalizer = {
  encode: (value: ThemeState) => value.state,
  decode: (value: SerializedThemeState) => createThemeState(value),
}

function getInitialSystemTheme(): SerializedThemeState {
  if (!$document) {
    return null
  }
  return { color: $document.documentElement.getAttribute('data-system-ct') }
}

const ThemeContext = createContext<ThemeCycleFn>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const eventData = useRef<[string, { value: string; prev_value: string }]>()
  const [theme, setTheme] = useLocalStorage(site.themeStorageKey, {
    initialValue: getInitialSystemTheme,
    normalizer: themeStateNormalizer,
  })

  useAnalyticsEffect(
    ({ user, event }) => {
      user({ color_theme: theme.color.id, edges_theme: theme.edges.id })
      if (eventData.current) {
        event(...eventData.current)
      }
    },
    [theme],
  )

  const cycle = useCallback<ThemeCycleFn>(
    (type) => {
      const next = theme.cycle(type)
      $document.documentElement.className = next.class
      $document.head.querySelector<HTMLMetaElement>('meta[name=theme-color]').content =
        next.color.colors.primary
      eventData.current = [
        `change_${type}_theme`,
        {
          value: next[type].id,
          prev_value: theme[type].id,
        },
      ]
      setTheme(next)
    },
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={cycle}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return ctx
}
