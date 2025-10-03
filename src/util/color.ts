export function toRgb(color: string) {
  const hexMatch = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color)
  if (hexMatch) {
    const raw = hexMatch[1]
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

  const rgbMatch = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(color)
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1).map((value) => Number(value))
    if ([r, g, b].every((channel) => Number.isInteger(channel) && channel >= 0 && channel <= 255)) {
      return { r, g, b }
    }
  }

  return null
}

function channelMix(channel: number, target: number, amount: number) {
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
