import type { ReactNode } from 'react'
import { cx } from '../util'
import { useLayout } from '../providers/layout'

export interface HeadingProps {
  // Heading text/content
  title: string
  // If false, show subtitle inline instead of on its own line. Default: `true`
  multiline?: boolean
  // If true, renders `<h1>`; otherwise `<h2>`
  primary?: boolean
  // Subtitle content
  children?: ReactNode
  // Right-aligned slot
  end?: ReactNode
  // Extra classes on the outer `<header>`
  className?: string
  // `id` applied to the `<h*>` element
  id?: string
}

/**
 * Print-aware page/section heading.
 *
 * - Uses `<h1>` when `primary` is true; otherwise `<h2>`.
 * - `children` acts as the subtitle.
 * - When `multiline={false}`, the subtitle is rendered inline after an em dash.
 * - Right-aligned content (buttons/badges) goes in `end`.
 */
export default function Heading(props: HeadingProps) {
  const { title, multiline = true, primary, children, end, className, id } = props
  const { isPrint } = useLayout()
  const Tag = primary ? 'h1' : 'h2'
  const inline = !multiline
  const subtitle = children

  const containerBase = isPrint ? 'mb-4' : 'max-w-4xl mb-12'
  const headingClass = isPrint
    ? cx('leading-normal text-primary', primary ? 'text-3xl' : 'text-2xl uppercase')
    : 'italic leading-normal word-tracking-tighter text-typo text-3xl'
  const subtitleClass = isPrint
    ? cx('leading-normal text-typo', primary && 'text-lg')
    : 'leading-normal text-typo-dim mt-4 text-xl'

  return (
    <header className={cx(containerBase, className)}>
      <div className='flex items-center'>
        <div className='flex-grow flex items-center'>
          <Tag className={headingClass} id={id}>
            {title}
          </Tag>
          {inline && subtitle ? <span className='mx-2'>—</span> : null}
          {inline && subtitle ? <div>{subtitle}</div> : null}
        </div>
        {end}
      </div>

      {!inline && subtitle ? <div className={subtitleClass}>{subtitle}</div> : null}
    </header>
  )
}
