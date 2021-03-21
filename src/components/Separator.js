import React from 'react'
import classNames from 'classnames'

export default ({ silent = false, size = 2, spacing = 4, className }) => (
  <hr className={classNames(`sep sep-${size} my-${spacing}`, { 'sep-bg': !silent }, className)} />
)
