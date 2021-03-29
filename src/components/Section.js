import React from 'react'
import classNames from 'classnames'

export default function Section({ children, className }) {
  return (
    <section className={classNames('px-20 pb-20', className)}>
      {children}
    </section>
  )
}
