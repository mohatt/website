import React from 'react'
import { cx } from '../util'
import { Layout, Separator } from '.'

export default function Section({ spacing = true, fill, sep = fill, className, children, ...props }) {
  return (
    <Layout print>
      <section {...props} className={cx('px-10', { 'mb-10': spacing, 'py-10 bg-accent': fill }, className)}>
        {children}
      </section>
      <section {...props} className={spacing ? 'mb-10 md:mb-14 lg:mb-20' : undefined}>
        {(sep === true || sep === 'pre') && <Separator />}
        <div className={cx('px-10 lg:px-14 3xl:px-16 4xl:px-20', fill && 'py-10 md:py-14 lg:py-20 bg-accent', className)}>
          {children}
        </div>
        {(sep === true || sep === 'post') && <Separator />}
      </section>
    </Layout>
  )
}
