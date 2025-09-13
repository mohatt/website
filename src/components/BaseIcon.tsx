import type { ReactNode } from 'react'
import { cx } from '../util'

export interface BaseIconProps {
  path?: string
  children?: ReactNode
  viewBox?: string
  className?: string
}

export default function BaseIcon({
  path,
  viewBox = '0 0 24 24',
  children,
  className,
}: BaseIconProps) {
  return (
    <svg className={cx('icon', className)} viewBox={viewBox}>
      {path ? <path d={path} /> : children}
    </svg>
  )
}
