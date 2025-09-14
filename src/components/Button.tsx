import { ComponentProps } from 'react'
import { cx } from '../util'
import Link, { LinkProps } from './Link'

interface BaseButtonProps {
  color?: string
  size?: string
  rounded?: boolean
  active?: boolean
  disabled?: boolean
  outline?: boolean
  className?: string
}

export type HandlerButtonProps = ComponentProps<'button'> & BaseButtonProps
export type LinkButtonProps = LinkProps & BaseButtonProps
export type ButtonProps = HandlerButtonProps | LinkButtonProps

export default function Button(props: ButtonProps) {
  const { color, size, rounded = true, active, disabled, outline, className, ...rest } = props
  const Element = 'to' in rest || 'href' in rest ? Link : 'button'
  return (
    <Element
      className={cx(
        'btn',
        color && `btn-${color}`,
        size && `btn-${size}`,
        {
          'rounded-full': rounded,
          'btn-outline': outline,
          'btn-active': active,
          'btn-disabled': disabled,
        },
        className,
      )}
      {...(rest as any)}
    />
  )
}
