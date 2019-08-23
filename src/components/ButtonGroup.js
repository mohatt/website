import React from 'react'
import classNames from 'classnames'

const ButtonGroup = ({ children, spacing, className }) => {
  return (
    <div className={classNames('btn-group', { 'btn-group-glue': !spacing }, className)}>
      {children}
    </div>
  )
}

export default ButtonGroup
