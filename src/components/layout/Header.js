import React from 'react'
import { Author, Contacts, Menu } from './header'
import { useSiteMetadata } from '../../hooks'

const Header = () => {
  const { author, menu } = useSiteMetadata()

  return (
    <>
      <div className='w-1/12 h-screen'>
        <header className='w-inherit h-inherit bg-typo fixed border-r-4 border-primary z-20'>
          <Author author={author} />
          <Contacts contacts={author.contacts} />
        </header>
      </div>
      <div className='w-2/12 h-screen'>
        <Menu items={menu} />
      </div>
    </>
  )
}

export default Header
