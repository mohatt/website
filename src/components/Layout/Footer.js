import React from 'react'
import { useSiteMetadata } from '../../hooks'
import { Section, Separator } from '..'

function Footer({ className }) {
  const { copyright } = useSiteMetadata()
  return (
    <footer className={className}>
      <Separator size='4' />
      <Section className='py-14 bg-accent font-display' spacing={false}>
        {copyright}
      </Section>
    </footer>
  )
}

export default React.memo(Footer)
