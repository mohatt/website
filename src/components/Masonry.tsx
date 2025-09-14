import type { ReactNode } from 'react'
import BaseMasonry, { MasonryProps as BaseMasonryProps } from 'react-masonry-css'
import { cx } from '../util'

export interface MasonryProps {
  children: ReactNode
  cols?: BaseMasonryProps['breakpointCols']
  className?: string
}

export default function Masonry({ children, cols, className }: MasonryProps) {
  return (
    <BaseMasonry breakpointCols={cols ?? 2} className={cx('masonry', className)}>
      {children}
    </BaseMasonry>
  )
}
