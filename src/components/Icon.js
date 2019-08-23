import React from 'react'
import classNames from 'classnames'
import { getIcon } from '../utils'

const Icon = ({ name, className }) => {
  const icon = getIcon(name)

  return (
    <svg className={classNames('icon', className)} viewBox={icon.viewBox}>
      <path d={icon.path} />
    </svg>
  )
}

export default Icon
