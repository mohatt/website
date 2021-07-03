import React from 'react'
import classNames from 'classnames'

export default function Section({ full, spacing = true, className, ...props }) {
  return (
    <section
      className={classNames(
        {
          'px-10 lg:px-14 3xl:px-16 4xl:px-20': !full,
          'pb-10 md:pb-14 lg:pb-20': spacing,
        },
        className
      )}
      {...props}
    />
  )
}
