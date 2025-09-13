import { cx } from '../util'

export interface SeparatorProps {
  size?: number
  // Background gradient. Default: `true`
  gradient?: boolean
  spacing?: boolean | 'top' | 'bottom'
  className?: string
}

export default function Separator({
  size = 2,
  gradient = true,
  spacing,
  className,
}: SeparatorProps) {
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
