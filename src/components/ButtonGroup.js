import React from 'react'
import classNames from 'classnames'

function ButtonGroup({ children, spacing, className }) {
  return (
    <div className={classNames('btn-group', { 'btn-group-glue': !spacing }, className)}>
      {children}
    </div>
  )
}

export default React.memo(ButtonGroup)
