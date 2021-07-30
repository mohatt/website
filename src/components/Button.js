import React from 'react'
import { cx } from '../util'
import { Link } from '.'

export default function Button({ color, size, rounded = true, active, disabled, outline, className, ...props }) {
  const Element = props.to ? Link : 'button'
  return (
    <Element
      className={cx(
        'btn',
        color && `btn-${color}`,
        size && `btn-${size}`,
        {
          'rounded-full': rounded,
          'btn-outline': outline,
          'btn-active': active,
          'btn-disabled': disabled,
        },
        className
      )}
      {...props}
    />
  )
}
