import React from 'react'
import { cx } from '../util'
import * as styles from './ProgressRing.module.css'

export default function ProgressRing({ value = 0, stroke = 12, className }) {
  const progress = value / 100
  const radius = 50 - stroke / 2
  const circumference = radius * Math.PI * 2
  const offset = circumference * (1 - progress)

  return (
    <svg className={cx(styles.progress, className)} viewBox='0 0 100 100'>
      <title>{`${value}%`}</title>
      <circle className={styles.meter} cx='50' cy='50' r={radius} strokeWidth={stroke} />
      <circle
        className={styles.value}
        cx='50'
        cy='50'
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}
