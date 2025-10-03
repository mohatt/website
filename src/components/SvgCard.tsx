import { memo, CSSProperties, ReactNode } from 'react'
import { ThemeState, useTheme } from '@/providers/theme'

export type SvgCardPattern = 'grid' | 'dots' | 'diagonal' | 'isometric' | 'none'
export type SvgCardGradient = readonly [string, string]

const GRADIENTS: readonly SvgCardGradient[] = [
  ['#0ea5e9', '#6366f1'],
  ['#ec4899', '#8b5cf6'],
  ['#14b8a6', '#0ea5e9'],
  ['#f97316', '#ef4444'],
  ['#22d3ee', '#0ea5e9'],
  ['#f87171', '#fb7185'],
  ['#8b5cf6', '#6366f1'],
  ['#facc15', '#f97316'],
  ['#34d399', '#10b981'],
  ['#f472b6', '#a855f7'],
  ['#ffffff', '#44ffee'],
]

function hashSeed(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function toRgb(color: string) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color)
  if (!match) {
    return null
  }
  const raw = match[1]
  const normalized =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const value = parseInt(normalized, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function channelMix(channel: number, target: number, amount: number) {
  return Math.round(channel + (target - channel) * amount)
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

function lighten(color: string, amount: number) {
  const rgb = toRgb(color)
  if (!rgb) {
    return color
  }
  return rgbToHex(
    channelMix(rgb.r, 255, amount),
    channelMix(rgb.g, 255, amount),
    channelMix(rgb.b, 255, amount),
  )
}

function darken(color: string, amount: number) {
  const rgb = toRgb(color)
  if (!rgb) {
    return color
  }
  return rgbToHex(
    channelMix(rgb.r, 0, amount),
    channelMix(rgb.g, 0, amount),
    channelMix(rgb.b, 0, amount),
  )
}

function themeGradient(theme: ThemeState['color']): SvgCardGradient {
  const {
    colors: { accent },
    dark,
  } = theme
  if (dark) {
    return [lighten(accent, 0.1), accent]
  }
  return [darken(accent, 0.25), accent]
}

function themeDefaults(theme: ThemeState['color']) {
  const {
    colors: { typo, secondary },
    dark,
  } = theme
  return {
    background: secondary,
    iconColor: typo,
    iconTextColor: typo,
    titleColor: typo,
    captionColor: dark ? 'rgba(255,255,255,0.65)' : 'rgba(17, 24, 39, 0.65)',
    patternColor: secondary,
  }
}

function renderPatternDefinition(
  id: string,
  type: Exclude<SvgCardPattern, 'none'>,
  color: string,
  opacity: number,
) {
  if (type === 'dots') {
    return (
      <pattern id={id} width='16' height='16' patternUnits='userSpaceOnUse'>
        <circle cx='4' cy='4' r='2' fill={color} fillOpacity={opacity} />
      </pattern>
    )
  }

  if (type === 'diagonal') {
    return (
      <pattern
        id={id}
        width='28'
        height='28'
        patternUnits='userSpaceOnUse'
        patternTransform='rotate(45)'
      >
        <line
          x1='0'
          y1='14'
          x2='28'
          y2='14'
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth='1.5'
        />
      </pattern>
    )
  }

  if (type === 'isometric') {
    const base = color
    const lighter = lighten(base, 0.55)
    const light = lighten(base, 0.35)
    const mid = lighten(base, 0.15)
    const dark = darken(base, 0.25)
    const darker = darken(base, 0.45)

    return (
      <pattern
        id={id}
        width='540'
        height='450'
        patternUnits='userSpaceOnUse'
        viewBox='0 0 1080 900'
      >
        <g fillOpacity={opacity}>
          <path d='m90 150-90 150h180z' fill={dark} />
          <path d='m90 150 90-150h-180z' fill={mid} />
          <path d='m270 150 90-150h-180z' fill={light} />
          <path d='m450 150-90 150h180z' fill={lighter} />
          <path d='m450 150 90-150h-180z' fill={mid} />
          <path d='m630 150-90 150h180z' fill={base} />
          <path d='m630 150 90-150h-180z' fill={lighter} />
          <path d='m810 150-90 150h180z' fill={dark} />
          <path d='m810 150 90-150h-180z' fill={lighter} />
          <path d='m990 150-90 150h180z' fill={lighter} />
          <path d='m990 150 90-150h-180z' fill={dark} />
          <path d='m90 450-90 150h180z' fill={lighter} />
          <path d='m90 450 90-150h-180z' fill={base} />
          <path d='m270 450-90 150h180z' fill={dark} />
          <path d='m270 450 90-150h-180z' fill={light} />
          <path d='m450 450-90 150h180z' fill={lighter} />
          <path d='m450 450 90-150h-180z' fill={mid} />
          <path d='m630 450-90 150h180z' fill={mid} />
          <path d='m630 450 90-150h-180z' fill={lighter} />
          <path d='m810 450-90 150h180z' fill={base} />
          <path d='m810 450 90-150h-180z' fill={lighter} />
          <path d='m990 450-90 150h180z' fill={light} />
          <path d='m990 450 90-150h-180z' fill={dark} />
          <path d='m90 750-90 150h180z' fill={darker} />
          <path d='m270 750-90 150h180z' fill={base} />
          <path d='m270 750 90-150h-180z' fill={lighter} />
          <path d='m450 750 90-150h-180z' fill={base} />
          <path d='m630 750-90 150h180z' fill={base} />
          <path d='m630 750 90-150h-180z' fill={dark} />
          <path d='m810 750-90 150h180z' fill={light} />
          <path d='m810 750 90-150h-180z' fill={dark} />
          <path d='m990 750-90 150h180z' fill={mid} />
          <path d='m180 0-90 150h180z' fill={mid} />
          <path d='m360 0-90 150h180z' fill={dark} />
          <path d='m540 0-90 150h180z' fill={lighter} />
          <path d='m900 0-90 150h180z' fill={base} />
          <path d='m0 300-90 150h180z' fill={darker} />
          <path d='m0 300 90-150h-180z' fill={lighter} />
          <path d='m180 300-90 150h180z' fill={lighter} />
          <path d='m180 300 90-150h-180z' fill={dark} />
          <path d='m360 300-90 150h180z' fill={darker} />
          <path d='m360 300 90-150h-180z' fill={lighter} />
          <path d='m540 300-90 150h180z' fill={dark} />
          <path d='m540 300 90-150h-180z' fill={darker} />
          <path d='m720 300-90 150h180z' fill={light} />
          <path d='m720 300 90-150h-180z' fill={dark} />
          <path d='m900 300-90 150h180z' fill={lighter} />
          <path d='m900 300 90-150h-180z' fill={mid} />
          <path d='m0 600-90 150h180z' fill={base} />
          <path d='m0 600 90-150h-180z' fill={dark} />
          <path d='m180 600-90 150h180z' fill={light} />
          <path d='m180 600 90-150h-180z' fill={dark} />
          <path d='m360 600-90 150h180z' fill={dark} />
          <path d='m360 600 90-150h-180z' fill={mid} />
          <path d='m540 600 90-150h-180z' fill={dark} />
          <path d='m720 600-90 150h180z' fill={darker} />
          <path d='m900 600-90 150h180z' fill={lighter} />
          <path d='m900 600 90-150h-180z' fill={darker} />
          <path d='m0 900 90-150h-180z' fill={lighter} />
          <path d='m180 900 90-150h-180z' fill={dark} />
          <path d='m360 900 90-150h-180z' fill={lighter} />
          <path d='m540 900 90-150h-180z' fill={light} />
          <path d='m720 900 90-150h-180z' fill={lighter} />
          <path d='m900 900 90-150h-180z' fill={darker} />
          <path d='m1080 300-90 150h180z' fill={darker} />
          <path d='m1080 300 90-150h-180z' fill={lighter} />
          <path d='m1080 600-90 150h180z' fill={base} />
          <path d='m1080 600 90-150h-180z' fill={dark} />
          <path d='m1080 900 90-150h-180z' fill={lighter} />
        </g>
      </pattern>
    )
  }

  return (
    <pattern id={id} width='32' height='32' patternUnits='userSpaceOnUse'>
      <path d='M0 0H32' stroke={color} strokeOpacity={opacity} strokeWidth='1' />
      <path d='M0 0V32' stroke={color} strokeOpacity={opacity} strokeWidth='1' />
    </pattern>
  )
}

export interface SvgCardProps {
  width?: number
  height?: number
  aspectRatio?: number
  seed?: string
  bgColor?: string
  bgGradient?: SvgCardGradient
  pattern?: SvgCardPattern
  patternColor?: string
  patternOpacity?: number
  icon?: ReactNode | string
  iconSize?: number
  iconColor?: string
  iconViewBox?: number
  iconText?: string
  iconTextColor?: string
  iconTextWeight?: string | number
  iconTextClassName?: string
  gap?: number
  title: string
  titleSize?: number
  titleColor?: string
  titleWeight?: string | number
  titleClassName?: string
  caption?: string
  captionSize?: number
  captionColor?: string
  captionWeight?: string | number
  captionClassName?: string
  captionGap?: number
  borderRadius?: number
  responsive?: boolean
  className?: string
  style?: CSSProperties
}

function SvgCard(props: SvgCardProps) {
  const { theme } = useTheme()
  const defaults = themeDefaults(theme.color)

  const {
    width = 430,
    height: heightProp,
    aspectRatio = 1.8,
    seed,
    bgColor,
    bgGradient,
    pattern = 'isometric',
    patternColor,
    patternOpacity = 0.15,
    icon,
    iconSize = 64,
    iconColor,
    iconViewBox = 24,
    iconText,
    iconTextColor,
    iconTextWeight = 700,
    iconTextClassName = 'font-display',
    gap = 32,
    title,
    titleSize = 26,
    titleColor,
    titleWeight = 500,
    titleClassName = 'font-display',
    caption,
    captionSize = 16,
    captionColor,
    captionWeight = 500,
    captionClassName = 'font-body',
    captionGap = 12,
    borderRadius = 0,
    responsive = false,
    className,
    style,
  } = props

  const viewWidth = width
  const viewHeight = heightProp ?? Math.round(viewWidth / aspectRatio)
  const resolvedSeed = seed ?? title

  const gradientColors =
    bgGradient ??
    (!bgColor ? themeGradient(theme.color) : GRADIENTS[hashSeed(resolvedSeed) % GRADIENTS.length])

  const gradientId = gradientColors
    ? `svg-card-gradient-${hashSeed(`${resolvedSeed}-${viewWidth}-${viewHeight}`)}`
    : undefined

  const backgroundFill = gradientId ? `url(#${gradientId})` : (bgColor ?? defaults.background)
  const resolvedIconColor = iconColor ?? defaults.iconColor
  const resolvedIconTextColor = iconTextColor ?? defaults.iconTextColor
  const resolvedTitleColor = titleColor ?? defaults.titleColor
  const resolvedCaptionColor = captionColor ?? defaults.captionColor
  const resolvedPatternColor = patternColor ?? defaults.patternColor
  const patternOpacityValue = Math.min(Math.max(patternOpacity, 0), 1)
  const patternType = pattern ?? 'grid'
  const patternId =
    patternType !== 'none' && patternOpacityValue > 0
      ? `svg-card-pattern-${hashSeed(`${resolvedSeed}-${patternType}`)}`
      : undefined
  const patternDefinition =
    patternId && patternType !== 'none'
      ? renderPatternDefinition(patternId, patternType, resolvedPatternColor, patternOpacityValue)
      : null

  const hasCaption = Boolean(caption)
  const captionHeight = hasCaption ? captionSize + captionGap : 0
  const totalHeight = iconSize + gap + titleSize + captionHeight
  const centerY = viewHeight / 2
  const iconY = centerY - totalHeight / 2 + iconSize / 2
  const titleY = iconY + iconSize / 2 + gap + titleSize / 2
  const captionY = hasCaption ? titleY + titleSize / 2 + captionGap + captionSize / 2 : 0

  const textIcon = iconText ?? (!icon ? '--' : '')
  const shouldScaleIcon = !textIcon
  const iconTransform = shouldScaleIcon
    ? `translate(${-iconSize / 2}, ${-iconSize / 2}) scale(${iconSize / iconViewBox})`
    : undefined

  const svgWidthAttr = responsive ? '100%' : viewWidth
  const svgHeightAttr = responsive ? '100%' : viewHeight
  const svgStyle: CSSProperties | undefined = responsive
    ? {
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: `${viewWidth} / ${viewHeight}`,
        ...style,
      }
    : { display: 'block', ...style }

  const hasGradient = Boolean(gradientId && gradientColors)
  const hasPattern = Boolean(patternDefinition)
  const needsDefs = hasGradient || hasPattern

  return (
    <svg
      width={svgWidthAttr}
      height={svgHeightAttr}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={title}
      preserveAspectRatio='xMidYMid meet'
      className={className}
      style={svgStyle}
    >
      {needsDefs && (
        <defs>
          {hasGradient && gradientColors && (
            <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor={gradientColors[0]} />
              <stop offset='100%' stopColor={gradientColors[1]} />
            </linearGradient>
          )}
          {hasPattern && patternDefinition}
        </defs>
      )}
      <rect width={viewWidth} height={viewHeight} rx={borderRadius} fill={backgroundFill} />
      {patternId && (
        <rect width={viewWidth} height={viewHeight} rx={borderRadius} fill={`url(#${patternId})`} />
      )}
      <g transform={`translate(${viewWidth / 2}, ${iconY})`}>
        <g transform={iconTransform} fill={resolvedIconColor}>
          {textIcon ? (
            <text
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize={iconSize}
              fontWeight={iconTextWeight}
              fill={resolvedIconTextColor}
              letterSpacing='0.04em'
              className={iconTextClassName}
            >
              {textIcon}
            </text>
          ) : typeof icon === 'string' ? (
            <path d={icon} fill={resolvedIconColor} />
          ) : (
            icon
          )}
        </g>
      </g>
      <text
        x='50%'
        y={titleY}
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={titleSize}
        fill={resolvedTitleColor}
        fontWeight={titleWeight}
        className={titleClassName}
      >
        {title}
      </text>
      {hasCaption && (
        <text
          x='50%'
          y={captionY}
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={captionSize}
          fill={resolvedCaptionColor}
          fontWeight={captionWeight}
          className={captionClassName}
        >
          {caption}
        </text>
      )}
    </svg>
  )
}

export default memo(SvgCard)
