import React from 'react'
import classNames from 'classnames'
import { ICONS } from '../commons'

function Icon({ name, path, className }) {
  const icon = path ? { path: path, viewBox: '0 0 24 24' } : ICONS[name]
  return icon && (
    <svg className={classNames('icon', className)} viewBox={icon.viewBox}>
      <path d={icon.path} />
    </svg>
  )
}

export default React.memo(Icon)
