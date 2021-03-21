import React from 'react'

export default ({
  children,
  level = 2,
  size = '4xl',
  width = '2xl',
  spacing = 8,
  leading = 'none',
  pretitle,
  subtitle,
  className = '',
}) => {
  const HeadingTag = `h${level}`
  // either "$titleSize" or "$preTitleSize $titleSize $subtitleSize"
  const sizes = size.split(' ', 3)
  if (sizes.length !== 3) {
    sizes.unshift('lg')
    sizes.push('2xl')
  }

  const [preTitleSize, titleSize, subtitleSize] = sizes

  return (
    <header className={`rfs:max-w-${width}`}>
      {pretitle && (
        <div className={`text-typo-dim font-display italic rfs:text-${preTitleSize}`}>
          {pretitle}
        </div>
      )}
      <HeadingTag className={`text-typo font-display font-medium italic rfs:text-${titleSize} my-${spacing} leading-${leading}`}>
        {children}
      </HeadingTag>
      {subtitle && (
        <div className={`text-typo-dim font-body rfs:text-${subtitleSize} pb-4`}>{subtitle}</div>
      )}
    </header>
  )
}
