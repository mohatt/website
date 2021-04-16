import React from 'react'
import { useCurrentRoute, useSiteMetadata } from '../../hooks'
import { Separator } from '..'

const Footer = React.memo(props => {
  const { copyright } = useSiteMetadata()
  const { path } = useCurrentRoute()
  if(path === '/') {
    return null
  }
  return (
    <footer {...props}>
      <Separator size='4' spacing={false} />
      <div className='px-20 py-16 bg-accent font-display'>
        {copyright}
      </div>
    </footer>
  )
})

export default Footer
