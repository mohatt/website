import React from 'react'
import Helmet from 'react-helmet'
import useMetadata from '../../hooks/site-metadata'
import { getCurrentRoute } from '../../commons'
import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'
import Separator from '../Separator'
import * as styles from './index.module.css'
import avatar from '../../assets/img/avatar/avatar.png'
import avatarAlt from '../../assets/img/avatar/avatar-smile.png'

export default ({ children, title = null, pretitle = null, description = null }) => {
  const site = useMetadata()
  const { path } = getCurrentRoute()

  pretitle = pretitle || `require('.${path === '/' ? '/index' : path}.md');`
  title = title ? `${title} — ${site.title}` : site.title
  description = description || site.description

  return (
    <div className='h-screen overflow-hidden grid grid-rows-1	grid-cols-12'>
      <Helmet>
        <html lang='en' className='text-base xl:text-lg'/>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:type' content='website' />
        <meta name='og:site_name' content={site.title} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content={description} />
        <link rel='preload' href={avatar} as='image' />
        <link rel='preload' href={avatarAlt} as='image' />
      </Helmet>
      <div className='border-r-4 border-primary bg-typo text-primary z-20'>
        <header className='h-full relative'>
          <Author author={site.author} />
          <Contacts contacts={site.author.contacts} />
        </header>
      </div>
      <div className={`col-span-2 hidden lg:flex flex-col justify-center bg-accent text-typo-dim text-shadow ${styles.nav}`}>
        <Menu items={site.menu} />
      </div>
      <div className='col-span-11 lg:col-span-9 overflow-y-auto flex flex-col bg-secondary text-typo-dim text-shadow'>
        <main className='mt-32 flex-grow flex-shrink-0 flex flex-col justify-center'>
          <div className='px-20 font-display italic'>
            {pretitle}
          </div>
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
