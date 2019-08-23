import React from 'react'
import classNames from 'classnames'

const Separator = ({ silent, size, spacing, className }) => (
  <hr className={classNames(`sep sep-${size} my-${spacing}`, { 'sep-bg': !silent }, className)} />
)

Separator.defaultProps = {
  size: 2,
  spacing: 4,
  silent: false
}

export default Separator
