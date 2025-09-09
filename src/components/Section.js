import React from 'react'
import { cx } from '../util'
import { useLayout } from '../providers/layout'
import { Separator } from '.'

/**
 * Section: a padded block with optional separators and print-aware styles.
 *
 * @param {object} props Component props
 * @param {boolean} [props.spacing=true] Adds vertical margin below the section.
 * @param {boolean} [props.fill] When true, adds background and vertical padding to the inner wrapper.
 * @param {true|'pre'|'post'|undefined} [props.sep=props.fill]
 *  - Render separators. In screen mode:
 *    * `true`: both pre and post
 *    * `'pre'`: only before
 *    * `'post'`: only after
 *  - In print mode: a single separator is rendered before content.
 * @param {boolean} [props.pageBreak] In print mode, inserts a page break before this section.
 * @param {string} [props.className] Extra classes for the OUTER <section>.
 * @param {string} [props.innerClassName] Extra classes for the INNER content wrapper.
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export default function Section({
  spacing = true,
  fill,
  sep = fill,
  pageBreak,
  className,
  innerClassName,
  children,
  ...props
}) {
  const { isPrint } = useLayout()

  if (isPrint) {
    return (
      <section
        {...props}
        className={cx(
          spacing && 'mb-6',
          fill && 'bg-accent',
          pageBreak && 'print:page-break print:mt-6',
          className,
        )}
      >
        {sep && (
          <Separator
            spacing={!fill && 'bottom'}
            className={cx(pageBreak && 'print:hidden')}
            gradient={false}
          />
        )}
        <div className={cx('px-6', fill && 'py-4', innerClassName)}>{children}</div>
      </section>
    )
  }

  return (
    <section {...props} className={cx(spacing && 'mb-10 md:mb-14 lg:mb-20', className)}>
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
