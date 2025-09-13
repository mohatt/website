import type { ReactNode } from 'react'
import { cx } from '../util'

export interface ButtonGroupProps {
  children: ReactNode
  spacing?: boolean
  className?: string
}
export default function ButtonGroup({ children, spacing, className }: ButtonGroupProps) {
  return (
    <div className={cx('btn-group', { 'btn-group-glue': !spacing }, className)}>{children}</div>
  )
}
