import React from 'react'
import { cx } from '../util'
import { useLayout } from '../providers/layout'

/**
 * Print-aware page/section heading.
 *
 * - Uses `<h1>` when `primary` is true; otherwise `<h2>`.
 * - `children` acts as the subtitle.
 * - When `multiline={false}`, the subtitle is rendered inline after an em dash.
 * - Right-aligned content (buttons/badges) goes in `end`.
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.title Heading text/content (required).
 * @param {boolean} [props.multiline=true] If false, show subtitle inline instead of on its own line.
 * @param {boolean} [props.primary] If true, renders `<h1>`; otherwise `<h2>`.
 * @param {React.ReactNode} [props.children] Subtitle content.
 * @param {React.ReactNode} [props.end] Right-aligned slot.
 * @param {string} [props.className] Extra classes on the outer `<header>`.
 * @param {string} [props.id] `id` applied to the `<h*>` element.
 * @returns {JSX.Element}
 */
export default function Heading({
  title,
  multiline = true,
  primary,
  children,
  end,
  className,
  id,
}) {
  const { isPrint } = useLayout()
  const Tag = primary ? 'h1' : 'h2'
  const inline = multiline === false
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
