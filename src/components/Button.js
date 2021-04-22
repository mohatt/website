import React from 'react'
import classNames from 'classnames'
import { Link } from '.'

export default function Button({ color, active, mono, rounded = true, outline, className, ...props }) {
  const Element = props.to ? Link : 'button'
  return (
    <Element
      className={classNames(
        'btn',
        color && `btn-${color}`,
        {
          'rounded-full': rounded,
          'p-2': mono,
          'btn-outline': outline,
          'btn-active': active,
        },
        className
      )}
      {...props}
    />
  )
}
