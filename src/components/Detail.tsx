import type { ReactNode } from 'react'
import { cx } from '@/util'

export interface DetailProps {
  title: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

export default function Detail({ title, children, className, innerClassName }: DetailProps) {
  if (!children) return null
  return (
    <div className={cx('leading-normal', className)}>
      <h4 className='text-primary font-body text-[1.4rem]'>{title}</h4>
      <div className={cx('mt-3 font-medium', innerClassName)}>{children}</div>
    </div>
  )
}
