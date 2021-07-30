import React from 'react'
import { icons } from '../constants'
import { cx } from '../util'
import { BaseIcon } from '.'

export default function Icon({ name, className }) {
  const def = icons[name]
  if (!def) {
    throw new Error(`Invalid icon "${name}"`)
  }
  const props = typeof def === 'string' ? { path: def } : def
  return <BaseIcon {...props} className={cx(props.className, className)} />
}
