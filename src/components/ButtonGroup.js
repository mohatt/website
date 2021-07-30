import React from 'react'
import { cx } from '../util'

export default function ButtonGroup({ children, spacing, className }) {
  return (
    <div className={cx('btn-group', { 'btn-group-glue': !spacing }, className)}>
      {children}
    </div>
  )
}
