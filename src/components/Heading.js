import React from 'react'
import { cx } from '../util'
import { Layout } from '.'

export default function Heading({
  title,
  multiline = true,
  primary,
  children,
  endChildren,
  className,
}) {
  function renderHeading(props, containerProps) {
    const Component = primary ? 'h1' : 'h2'
    const titleElement = (
      <>
        <Component {...props}>{title}</Component>
        {!multiline && children && <div>&nbsp;— {children}</div>}
      </>
    )

    if (!endChildren) {
      return (
        <div {...containerProps} className={cx('flex items-center', containerProps?.className)}>
          {titleElement}
        </div>
      )
    }

    return (
      <div {...containerProps} className={cx('flex items-center', containerProps?.className)}>
        <div className='flex-grow flex items-center'>{titleElement}</div>
        {endChildren}
      </div>
    )
  }

  function renderSubtitle(classes) {
    if (!children || !multiline) {
      return null
    }

    return <div className={classes}>{children}</div>
  }

  return (
    <Layout print>
      <header className={cx('mb-4', className)}>
        {renderHeading({
          className: cx('leading-normal text-primary', primary ? 'text-3xl' : 'text-2xl uppercase'),
        })}
        {renderSubtitle(cx('leading-normal text-typo', primary && 'text-lg'))}
      </header>
      <header className={cx('max-w-4xl mb-12', className)}>
        {renderHeading({
          className: 'italic leading-normal word-tracking-tighter text-typo text-3xl',
        })}
        {renderSubtitle('leading-normal text-typo-dim mt-4 text-xl')}
      </header>
    </Layout>
  )
}
