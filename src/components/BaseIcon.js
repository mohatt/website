import React from 'react'
import classNames from 'classnames'

export default function BaseIcon({ path, viewBox = '0 0 24 24', children, className }) {
  return (
    <svg className={classNames('icon', className)} viewBox={viewBox}>
      {path ? <path d={path} /> : children}
    </svg>
  )
}
