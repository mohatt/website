import React from 'react'
import ReactMasonry from 'react-masonry-css'
import { cx } from '../util'

export default function Masonry({ children, cols, className }) {
  return (
    <ReactMasonry breakpointCols={cols ?? 2} className={cx('masonry', className)}>
      {children}
    </ReactMasonry>
  )
}
