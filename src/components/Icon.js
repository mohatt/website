import React from 'react'
import classNames from 'classnames'
import icons from '../commons/icons'
import { BaseIcon } from '.'

export default function Icon({ name, className }) {
  const def = icons[name]
  if (!def) {
    throw new Error(`Invalid icon "${name}"`)
  }
  const props = typeof def === 'string' ? { path: def } : def
  return <BaseIcon {...props} className={classNames(props.className, className)} />
}
