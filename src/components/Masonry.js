import React from 'react'
import ReactMasonry from 'react-masonry-css'
import { cx } from '../util'

export default function Masonry({ children, cols, gap = '2rem', className }) {
  return (
    <ReactMasonry
      breakpointCols={cols ?? 2}
      className={cx('masonry', className)}
      style={{ '--masonry-gap': gap }}
    >
      {children}
    </ReactMasonry>
  )
}
