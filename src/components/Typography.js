import React from 'react'
import { cx } from '../util'

export default function Typography({ className, ...props }) {
  return <div className={cx('typography', className)} {...props} />
}
