import React from 'react'
import { cx } from '../util'
import { Layout } from '.'

export default function Heading({ title, primary, children, className }) {
  const Hn = primary ? 'h1' : 'h2'
  return (
    <Layout print>
      <header className={cx('mb-6', className)}>
        <Hn className='leading-normal text-typo text-2xl'>
          {title}
        </Hn>
        {children && <div className='leading-normal text-typo-dim'>{children}</div>}
      </header>
      <header className={cx('max-w-3xl mb-12', className)}>
        <Hn className='italic leading-normal text-typo text-3xl'>
          {title}
        </Hn>
        {children && <div className='leading-normal text-typo-dim mt-4 text-xl'>{children}</div>}
      </header>
    </Layout>
  )
}
