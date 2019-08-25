import React from 'react'
import classNames from 'classnames'
import { Link } from './'

const Button = ({ color, mono, rounded, outline, className, ...props }) => {
  return (
    <Link
      className={classNames(`btn btn-${color}`, {
        'rounded-full': rounded,
        'p-2': mono,
        'btn-outline': outline
      }, className)}
      {...props}
    />
  )
}

Button.defaultProps = {
  color: 'primary',
  mono: false,
  rounded: true,
  outline: false
}

export default Button
