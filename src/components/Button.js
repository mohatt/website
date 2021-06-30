import React from 'react'
import classNames from 'classnames'
import { Link } from '.'

export default function Button({ color, size, rounded = true, active, disabled, outline, className, ...props }) {
  const Element = props.to ? Link : 'button'
  return (
    <Element
      className={classNames(
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
