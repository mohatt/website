import React from 'react'
import classNames from 'classnames'

export default function Section({ full, spacing = true, className, ...props }) {
  return (
    <section
      className={classNames(
        {
          'px-20': !full,
          'pb-20': spacing,
        },
        className
      )}
      {...props}
    />
  )
}
