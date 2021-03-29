import React from 'react'
import Helmet from 'react-helmet'
import { useLayout } from '../../state'
import { useSiteMetadata, useCurrentRoute } from '../../hooks'
import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'
import { Separator } from '..'
import * as styles from './index.module.css'
import avatar from '../../assets/img/avatar/avatar.png'
import avatarAlt from '../../assets/img/avatar/avatar-smile.png'

export default function Layout({ children }) {
  const site = useSiteMetadata()
  const { path } = useCurrentRoute()
  const { menuOpen, theme } = useLayout()

  return (
    <div className={`h-screen flex flex-row overflow-hidden theme:${theme}`}>
      <Helmet>
        <html lang='en' className='text-base xl:text-lg'/>
        <link rel='preload' href={avatar} as='image' />
        <link rel='preload' href={avatarAlt} as='image' />
      </Helmet>
      <div className='w-24 flex-shrink-0 border-r-4 border-primary bg-typo text-primary z-20'>
        <header className='h-full relative'>
          <Author author={site.author} />
          <Contacts contacts={site.author.contacts} />
        </header>
      </div>
      <div className={`${menuOpen ? 'w-64' : 'w-0'} lg:w-64 overflow-hidden flex-shrink-0 flex flex-col justify-center bg-accent text-typo-dim text-shadow ${styles.nav}`}>
        <Menu className='w-64' items={site.menu} />
      </div>
      <div className={`${menuOpen ? '-mr-64' : ''} lg:-mr-0 flex-grow overflow-y-auto flex flex-col bg-secondary text-typo-dim text-shadow ${styles.main}`}>
        <main className='mt-32 flex-grow flex-shrink-0 flex flex-col justify-center'>
          {children}
        </main>
        {path !== '/' && (
          <footer className='flex-shrink-0'>
            <Separator size='4' spacing='0' />
            <div className='px-20 py-16 bg-accent text-typo'>
              {site.copyright}
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
