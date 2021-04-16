import React from 'react'
import classNames from 'classnames'

function Separator({ size = 2, gradient = true, spacing = true, className }) {
  return (
    <hr className={classNames(
      `sep sep-${size}`,
      {
        'sep-gradient': gradient,
        'my-4': spacing
      },
      className,
    )} />
  )
}

export default React.memo(Separator)
