import React from 'react'
import classNames from 'classnames'

export default function Typography({ className, ...props }) {
  return (
    <div className={classNames('typography', className)} {...props} />
  )
}
