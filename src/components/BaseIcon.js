import React from 'react'
import { cx } from '../util'

export default function BaseIcon({ path, viewBox = '0 0 24 24', children, className }) {
  return (
    <svg className={cx('icon', className)} viewBox={viewBox}>
      {path ? <path d={path} /> : children}
    </svg>
  )
}
