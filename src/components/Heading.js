import React from 'react'
import { cx } from '../util'
import { Layout } from '.'

export default function Heading({ title, multiline = true, primary, children, endChildren, className }) {
  function renderHeading(classes) {
    const Component = primary ? 'h1' : 'h2'
    const titleElement = (
      <>
        <Component className={cx(classes)}>{title}</Component>
        {!multiline && children && <div>&nbsp;— {children}</div>}
      </>
    )
    if (!endChildren) {
      return <div className='flex items-center'>{titleElement}</div>
    }
    return (
      <div className='flex items-center'>
        <div className='flex-grow flex items-center'>{titleElement}</div>
        {endChildren}
      </div>
    )
  }

  function renderSubtitle(classes) {
    if (!children || !multiline) {
      return null
    }

    return <div className={cx(classes)}>{children}</div>
  }

  return (
    <Layout print>
      <header className={cx('mb-6', className)}>
        {renderHeading(['leading-normal text-typo text-2xl', !primary && 'uppercase'])}
        {renderSubtitle('leading-normal text-typo-dim')}
      </header>
      <header className={cx('max-w-4xl mb-12', className)}>
        {renderHeading('italic leading-normal text-typo text-3xl')}
        {renderSubtitle('leading-normal text-typo-dim mt-4 text-xl')}
      </header>
    </Layout>
  )
}
