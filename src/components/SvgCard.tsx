import { memo, CSSProperties, ReactNode } from 'react'
import { themes } from '@/constants'
import { useTheme } from '@/providers/theme'
import { darken, lighten } from '@/util/color'

export type SvgCardPattern = 'grid' | 'dots' | 'diagonal' | 'isometric'
export type SvgCardGradient = readonly [string, string]

type SvgCardIconViewBox = number | readonly [number, number]

interface SvgCardTheme {
  iconColor: string
  iconTextColor: string
  titleColor: string
  captionColor: string
  backgroundColor: string
  gradient: SvgCardGradient
  patternShades: {
    base: string
    lighter: string
    light: string
    mid: string
    dark: string
    darker: string
  }
}

function createPatternShades(base: string): SvgCardTheme['patternShades'] {
  return {
    base,
    lighter: lighten(base, 0.55),
    light: lighten(base, 0.35),
    mid: lighten(base, 0.15),
    dark: darken(base, 0.25),
    darker: darken(base, 0.45),
  }
}

const svgCardThemes = themes.color.reduce<Record<string, SvgCardTheme>>((accu, theme) => {
  const {
    id,
    colors: { accent, secondary, typo },
    dark,
  } = theme

  accu[id] = {
    iconColor: typo,
    iconTextColor: typo,
    titleColor: typo,
    captionColor: dark ? 'rgba(255,255,255,0.65)' : 'rgba(17, 24, 39, 0.65)',
    patternShades: createPatternShades(secondary),
    backgroundColor: secondary,
    gradient: dark ? [lighten(accent, 0.1), accent] : [darken(accent, 0.25), accent],
  }
  return accu
}, {})

function hashSeed(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function useSvgCardTheme(): SvgCardTheme {
  const { theme } = useTheme()
  return svgCardThemes[theme.color.id] ?? svgCardThemes[themes.color[0].id]
}

function renderPatternDef(
  id: string,
  type: SvgCardPattern,
  theme: SvgCardTheme,
  opacity: number,
  customColor?: string,
) {
  const color = customColor ?? theme.patternShades.base
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
    const palette = customColor ? createPatternShades(customColor) : theme.patternShades
    const { base, lighter, light, mid, dark, darker } = palette

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
  seed?: string
  width?: number
  height?: number
  aspectRatio?: number
  bgColor?: string
  bgGradient?: SvgCardGradient
  pattern?: SvgCardPattern | null
  patternColor?: string
  patternOpacity?: number
  /**
   * Provide raw SVG nodes (paths/groups). Avoid wrapping them in an <svg> so centering works as expected.
   */
  icon?: ReactNode | string
  iconSize?: number
  iconColor?: string
  iconViewBox?: SvgCardIconViewBox
  iconText?: string
  iconTextColor?: string
  iconTextWeight?: string | number
  iconTextClassName?: string
  gap?: number
  title?: string
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
  const {
    width = 430,
    height,
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
  const viewHeight = height ?? Math.round(viewWidth / aspectRatio)
  const resolvedSeed = seed ?? title

  const theme = useSvgCardTheme()
  const gradientColors = bgGradient ?? (!bgColor ? theme.gradient : null)
  const gradientId = gradientColors
    ? `svg-card-gradient-${hashSeed(`${resolvedSeed}-${viewWidth}-${viewHeight}`)}`
    : null
  const gradientDef = gradientId ? (
    <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stopColor={gradientColors[0]} />
      <stop offset='100%' stopColor={gradientColors[1]} />
    </linearGradient>
  ) : null

  const resolvedIconColor = iconColor ?? theme.iconColor
  const resolvedIconTextColor = iconTextColor ?? theme.iconTextColor
  const resolvedTitleColor = titleColor ?? theme.titleColor
  const resolvedCaptionColor = captionColor ?? theme.captionColor
  const resolvedPatternOpacity = Math.min(Math.max(patternOpacity, 0), 1)
  const patternId =
    pattern != null && resolvedPatternOpacity > 0
      ? `svg-card-pattern-${hashSeed(`${resolvedSeed}-${pattern}`)}`
      : null
  const patternDef = patternId
    ? renderPatternDef(patternId, pattern, theme, resolvedPatternOpacity, patternColor)
    : null

  const hasTitle = Boolean(title)
  const hasCaption = Boolean(caption)
  const totalHeight = (() => {
    let value = iconSize
    if (hasTitle) {
      value += gap + titleSize
    }
    if (hasCaption) {
      value += (hasTitle ? captionGap : gap) + captionSize
    }
    return value
  })()
  const centerY = viewHeight / 2
  let cursor = centerY - totalHeight / 2
  const iconY = cursor + iconSize / 2
  cursor += iconSize
  let titleY = 0
  if (hasTitle) {
    cursor += gap
    titleY = cursor + titleSize / 2
    cursor += titleSize
  }
  let captionY = 0
  if (hasCaption) {
    cursor += hasTitle ? captionGap : gap
    captionY = cursor + captionSize / 2
  }

  const textIcon = iconText ?? (!icon ? '--' : '')
  const shouldScaleIcon = !textIcon
  const iconViewBoxTuple = Array.isArray(iconViewBox) ? iconViewBox : [iconViewBox, iconViewBox]
  const [iconViewBoxWidth, iconViewBoxHeight] = iconViewBoxTuple as [number, number]
  const iconScale = shouldScaleIcon && iconViewBoxHeight ? iconSize / iconViewBoxHeight : 1
  const iconTranslateX = shouldScaleIcon ? (-iconViewBoxWidth * iconScale) / 2 : 0
  const iconTranslateY = shouldScaleIcon ? (-iconViewBoxHeight * iconScale) / 2 : 0
  const iconTransform = shouldScaleIcon
    ? `translate(${iconTranslateX}, ${iconTranslateY}) scale(${iconScale})`
    : null

  const svgWidthAttr = responsive ? '100%' : viewWidth
  const svgHeightAttr = responsive ? '100%' : viewHeight
  const svgStyle: CSSProperties = responsive
    ? {
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: `${viewWidth} / ${viewHeight}`,
        ...style,
      }
    : { display: 'block', ...style }
  const needsDefs = gradientDef != null || patternDef != null

  return (
    <svg
      width={svgWidthAttr}
      height={svgHeightAttr}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={title ?? caption ?? iconText}
      preserveAspectRatio='xMidYMid meet'
      className={className}
      style={svgStyle}
    >
      {needsDefs && (
        <defs>
          {gradientDef}
          {patternDef}
        </defs>
      )}
      <rect
        width={viewWidth}
        height={viewHeight}
        rx={borderRadius}
        fill={gradientId ? `url(#${gradientId})` : bgColor}
      />
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
      {hasTitle && (
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
      )}
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
