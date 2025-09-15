import { memo, ReactNode } from 'react'
import { cx } from '@/util'
import { useAnalyticsEffect, useLayout } from '@/hooks'
import { Section } from '@/components'

export interface PageLayoutProps {
  // Page title
  title?: string
  // Page snippet
  snippet?: string | SnippetProps
  // Page actions
  actions?: ReactNode
  // Page content
  children: ReactNode
}

export default function PageLayout(props: PageLayoutProps) {
  const { isPrint } = useLayout()
  const { title, snippet = {}, actions, children } = props

  useAnalyticsEffect(({ config, event }) => {
    config({ page_title: title })
    event('page_view')
  }, [])

  let snippetText = snippet as ReactNode
  if (typeof snippet !== 'string' && snippet != null) {
    snippetText = <Snippet $comp={title} {...snippet} />
  }

  return (
    <>
      {!isPrint && snippetText && (
        <Section spacing={false} innerClassName='flex font-display italic mb-4'>
          <div className={cx('flex-grow', typeof snippet === 'string' ? 'text-lg' : 'opacity-80')}>
            {snippetText}
          </div>
          {actions && <div className='text-right'>{actions}</div>}
        </Section>
      )}
      {children}
    </>
  )
}

interface SnippetProps {
  $comp?: string
  [key: string]: any
}

const Snippet = memo<SnippetProps>(function Snippet({ $comp = 'undefined', ...props }) {
  const Component = $comp.replace(/(?:^[^A-Za-z]*|[\W_]+)(.)?/g, (_, c) =>
    c ? c.toUpperCase() : '',
  )
  return `<${Component} ${Object.keys(props)
    .filter((a) => props[a] !== undefined)
    .map((a) => `${a}=${JSON.stringify(props[a])} `)
    .join(' ')}/>`
})
