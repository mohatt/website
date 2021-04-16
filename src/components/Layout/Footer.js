import React from 'react'
import { useCurrentRoute, useSiteMetadata } from '../../hooks'
import { Separator } from '..'

export default function Footer({ className }) {
  const { copyright } = useSiteMetadata()
  const { path } = useCurrentRoute()
  return path !== '/' && (
    <footer className={className}>
      <Separator size='4' spacing={false} />
      <div className='px-20 py-16 bg-accent font-display'>
        {copyright}
      </div>
    </footer>
  )
}
