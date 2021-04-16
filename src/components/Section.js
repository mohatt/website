import React from 'react'
import classNames from 'classnames'

function Section({ full, spacing = true, className, ...props }) {
  return (
    <section
      className={classNames(
        {
          'px-20': !full,
          'pb-20': spacing
        },
        className
      )}
      {...props}
    />
  )
}

export default React.memo(Section)
