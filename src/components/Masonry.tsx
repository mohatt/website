import type { ReactNode } from 'react'
import ReactMasonry from 'react-masonry-css'
import { cx } from '../util'

export interface MasonryProps {
  children: ReactNode
  cols?: number
  className?: string
}

export default function Masonry({ children, cols, className }: MasonryProps) {
  return (
    <ReactMasonry breakpointCols={cols ?? 2} className={cx('masonry', className)}>
      {children}
    </ReactMasonry>
  )
}
