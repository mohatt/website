import React from 'react'

const Heading = ({ children, level = 1, size = '4xl', width = '38rem', spacing = 8, pretitle, subtitle, className }) => {
  const HeadingTag = `h${level}`
  // either "$titleSize" or "$preTitleSize $titleSize $subtitleSize"
  const sizes = size.split(' ', 3)
  if (sizes.length !== 3) {
    sizes.unshift('lg')
    sizes.push('2xl')
  }

  const [preTitleSize, titleSize, subtitleSize] = sizes

  return (
    <header className={className} style={{ maxWidth: width }}>
      {pretitle &&
        <div className={`text-typo-dimmer font-mono italic rfs-${preTitleSize}`}>{pretitle}</div>}
      <HeadingTag className={`text-typo font-mono font-medium italic rfs-${titleSize} my-${spacing}`}>
        {children}
      </HeadingTag>
      {subtitle &&
        <div className={`text-typo-dim font-sans rfs-${subtitleSize} pb-4`}>{subtitle}</div>}
    </header>
  )
}

export default Heading
