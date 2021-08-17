import React from 'react'
import { site } from '../../constants'
import { Section } from '../../components'

function Footer({ className }) {
  return (
    <footer className={className}>
      <Section className='font-display' fill sep='pre' spacing={false}>
        {site.copyright}
      </Section>
    </footer>
  )
}

export default React.memo(Footer)
