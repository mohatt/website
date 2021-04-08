import React from 'react'
import Helmet from 'react-helmet'
import { useLayout } from './LayoutProvider'
import { useSiteMetadata, useCurrentRoute } from '../../hooks'
import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'
import { Separator } from '..'
import './Layout.css'

function Theme () {
  const { themeConfig } = useLayout()
  return (
    <Helmet>
      <html lang='en' className='text-base xl:text-lg' />
      <meta name="theme-color" content={themeConfig.colors.secondary} />
      <body className={themeConfig.getClassName()} />
    </Helmet>
  )
}

export default function Layout({ children }) {
  const site = useSiteMetadata()
  const { path } = useCurrentRoute()
  const { menuOpen } = useLayout()

/*
  React.useEffect(() => {
    window.___emitter.on('onDelayedLoadPageResources', ({ pathname }) => {
      console.log('onDelayedLoadPageResources', pathname)
    })
  }, [])
*/
  return (
    <div className='h-screen flex flex-row overflow-hidden'>
      <Theme />
      <div id='header' className='w-24 flex-shrink-0 border-r-4 border-primary bg-typo text-primary z-20'>
        <header className='h-full relative'>
          <Author author={site.author} />
          <Contacts contacts={site.author.contacts} />
        </header>
      </div>
      <div id='menu' className={`${menuOpen ? 'w-64' : 'w-0'} lg:w-64 overflow-hidden flex-shrink-0 flex flex-col justify-center bg-accent text-typo-dim text-shadow transition-box`}>
        <Menu className='w-64' items={site.menu} />
      </div>
      <div id='main' className={`${menuOpen ? '-mr-64' : ''} lg:-mr-0 flex-grow overflow-y-auto flex flex-col bg-secondary text-typo-dim text-shadow transition-box`}>
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
