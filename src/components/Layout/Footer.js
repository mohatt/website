import React from 'react'
import { useSiteMetadata } from '../../hooks'
import { Separator } from '..'

function Footer({ className }) {
  const { copyright } = useSiteMetadata()
  return (
    <footer className={className}>
      <Separator size='4' spacing={false} />
      <div className='px-20 py-16 bg-accent font-display'>
        {copyright}
      </div>
    </footer>
  )
}

export default React.memo(Footer)
