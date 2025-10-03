export function toRgb(color: string) {
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

export function channelMix(channel: number, target: number, amount: number) {
  return Math.round(channel + (target - channel) * amount)
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

export function lighten(color: string, amount: number) {
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

export function darken(color: string, amount: number) {
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
