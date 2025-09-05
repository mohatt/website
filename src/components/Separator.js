import React from 'react'
import { cx } from '../util'

export default function Separator({ size = 2, gradient = true, spacing, className }) {
  return (
    <hr
      className={cx(
        `sep sep-${size}`,
        {
          'sep-gradient': gradient,
          'my-4': spacing === true,
          'mb-4': spacing === 'bottom',
          'mt-4': spacing === 'top',
        },
        className,
      )}
    />
  )
}
