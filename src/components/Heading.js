import React from 'react'
import { cx } from '../util'

export default function Heading({ title, primary, children, className }) {
  const Hn = primary ? 'h1' : 'h2'
  return (
    <header className={cx('mb-12 max-w-3xl', { 'mt-4': primary }, className)}>
      <Hn className='italic text-3xl leading-normal text-typo'>{title}</Hn>
      {children && <div className='mt-4 text-xl leading-normal text-typo-dim'>{children}</div>}
    </header>
  )
}
