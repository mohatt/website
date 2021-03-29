import React from 'react'
import classNames from 'classnames'

export default function Heading({ title, primary, children, className }) {
  const Hn = primary ? 'h1' : 'h2'
  return (
    <header className={classNames('mb-12 max-w-2xl', { 'mt-4': primary }, className)}>
      <Hn className='italic text-3xl leading-normal text-typo'>
        {title}
      </Hn>
      {children && (
        <div className='mt-4 text-xl leading-normal text-typo-dim'>{children}</div>
      )}
    </header>
  )
}
