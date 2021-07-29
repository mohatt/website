import React from 'react'
import { site } from '../../constants'
import { Section, Separator } from '..'

function Footer({ className }) {
  return (
    <footer className={className}>
      <Separator size='4' />
      <Section className='py-14 bg-accent font-display' spacing={false}>
        {site.copyright}
      </Section>
    </footer>
  )
}

export default React.memo(Footer)
