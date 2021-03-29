import React from 'react'
import classNames from 'classnames'

export default function Separator({ silent, size = 2, spacing = 4, className }) {
  return (
    <hr className={classNames(
      `sep sep-${size} my-${spacing}`,
      { 'sep-bg': !silent },
      className,
    )} />
  )
}
