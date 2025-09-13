import type { HTMLAttributes } from 'react'
import { cx } from '../util'

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {}

export default function Typography({ className, ...props }: TypographyProps) {
  return <div className={cx('typography', className)} {...props} />
}
