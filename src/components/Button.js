import React from 'react'
import classNames from 'classnames'
import Link from './Link'

export default ({
  color = 'primary',
  mono = false,
  rounded = true,
  outline = false,
  className,
  ...props
}) => {
  return (
    <Link
      className={classNames(
        `btn btn-${color}`,
        {
          'rounded-full': rounded,
          'p-2': mono,
          'btn-outline': outline,
        },
        className
      )}
      {...props}
    />
  )
}
