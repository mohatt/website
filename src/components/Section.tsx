import type { ReactNode } from 'react'
import { cx } from '../util'
import { useLayout } from '../hooks'
import Separator from './Separator'

export interface SectionProps {
  // Adds vertical margin below the section. Default: `true`
  spacing?: boolean
  // When true, adds background and vertical padding to the inner wrapper
  fill?: boolean
  /**
   * Render separators. Default: `props.fill`
   * - In screen mode:
   *   - `true`: both pre and post
   *   - `'pre'`: only before
   *   - `'post'`: only after
   * - In print mode: a single separator is rendered before content.
   */
  sep?: boolean | 'pre' | 'post'
  // In print mode, inserts a page break before this section
  pageBreak?: boolean
  // Extra classes for the OUTER <section>
  className?: string
  // Extra classes for the INNER content wrapper
  innerClassName?: string
  children?: ReactNode
  id?: string
}

/**
 * Section: a padded block with optional separators and print-aware styles.
 */
export default function Section(props: SectionProps) {
  const {
    spacing = true,
    fill,
    sep = fill,
    pageBreak,
    className,
    innerClassName,
    children,
    ...rest
  } = props
  const { isPrint } = useLayout()

  if (isPrint) {
    return (
      <section
        {...rest}
        className={cx(
          spacing && 'mb-6',
          fill && 'bg-accent',
          pageBreak && 'print:page-break print:mt-6',
          className,
        )}
      >
        {sep && (
          <Separator
            spacing={!fill ? 'bottom' : false}
            className={cx(pageBreak && 'print:hidden')}
            gradient={false}
          />
        )}
        <div className={cx('px-6', fill && 'py-4', innerClassName)}>{children}</div>
      </section>
    )
  }

  return (
    <section {...rest} className={cx(spacing && 'mb-10 md:mb-14 lg:mb-20', className)}>
      {(sep === true || sep === 'pre') && <Separator />}
      <div
        className={cx(
          'px-10 lg:px-14 3xl:px-16 4xl:px-20',
          fill && 'py-10 md:py-14 lg:py-20 bg-accent',
          innerClassName,
        )}
      >
        {children}
      </div>
      {(sep === true || sep === 'post') && <Separator />}
    </section>
  )
}
