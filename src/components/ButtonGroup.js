import React from 'react'
import classNames from 'classnames'

export default ({ children, spacing, className }) => {
  return (
    <div className={classNames('btn-group', { 'btn-group-glue': !spacing }, className)}>
      {children}
    </div>
  )
}
