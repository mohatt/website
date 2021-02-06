import React from 'react'
import classNames from 'classnames'
import { getIcon } from '../utils'

const Icon = ({ name, path = '', className }) => {
  const icon = path ? { path: path, viewBox: '0 0 24 24' } : getIcon(name)
  return (
    <svg className={classNames('icon', className)} viewBox={icon.viewBox}>
      <path d={icon.path} />
    </svg>
  )
}

export default Icon
