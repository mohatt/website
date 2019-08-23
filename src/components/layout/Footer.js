import React from 'react'
import { Separator } from '../'
import { useSiteMetadata } from '../../hooks'

const Footer = () => {
  const { copyright } = useSiteMetadata()

  return (
    <>
      <Separator size='4' spacing='0' />
      <footer className='px-20 py-16 bg-accent text-typo rfs-lg'>
        {copyright}
      </footer>
    </>
  )
}

export default Footer
