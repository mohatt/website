import React from 'react'
import { cx } from '../util'
import { useLayout } from '../providers/layout'
import { Separator } from '.'

export default function Section({
  spacing = true,
  fill,
  sep = fill,
  pageBreak,
  className,
  children,
  ...props
}) {
  const layout = useLayout()

  if (layout.isPrint) {
    return (
      <section
        {...props}
        className={cx(
          { 'mb-6': spacing, 'bg-accent': fill, 'print:page-break print:mt-6': pageBreak },
          className,
        )}
      >
        {sep && (
          <Separator
            spacing={!fill && 'bottom'}
            className={cx({ 'print:hidden': pageBreak })}
            gradient={false}
          />
        )}
        <div className={cx('px-6', { 'py-4': fill })}>{children}</div>
      </section>
    )
  }

  return (
    <section {...props} className={spacing ? 'mb-10 md:mb-14 lg:mb-20' : undefined}>
      {(sep === true || sep === 'pre') && <Separator />}
      <div
        className={cx(
          'px-10 lg:px-14 3xl:px-16 4xl:px-20',
          fill && 'py-10 md:py-14 lg:py-20 bg-accent',
          className,
        )}
      >
        {children}
      </div>
      {(sep === true || sep === 'post') && <Separator />}
    </section>
  )
}
