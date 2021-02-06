import React from 'react'
import classNames from 'classnames'
import styles from './ProgressRing.module.css'

const ProgressRing = ({ value = 0, stroke = 12, className }) => {
  const progress = value / 100
  const radius = 50 - stroke / 2
  const circumference = radius * Math.PI * 2
  const offset = circumference * (1 - progress)

  return (
    <svg className={classNames(styles.progress, className)} viewBox='0 0 100 100'>
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

export default ProgressRing
