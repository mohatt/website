import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby-plugin-advanced-pages'

const Button = ({ children, to, target, rel, color, mono, rounded, outline, className }) => {
  return (
    <Link
      to={to}
      target={target}
      rel={rel}
      className={classNames(`btn btn-${color}`, {
        'rounded-full': rounded,
        'p-2': mono,
        'btn-outline': outline
      }, className)}
      children={children}
    />
  )
}

Button.defaultProps = {
  to: '',
  target: '_self',
  color: 'primary',
  rounded: true,
  mono: false,
  outline: false
}

export default Button
