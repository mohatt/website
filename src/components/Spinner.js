import React from 'react'
import classNames from 'classnames'

function Spinner({ className }) {
  return (
  <svg className={classNames('spinner', className)} viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
  </svg>
  )
}

export default React.memo(Spinner)
