import React from 'react'
import classNames from 'classnames'
import { Link } from './'

const Button = ({
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

export default Button
