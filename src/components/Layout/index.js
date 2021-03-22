import React from 'react'
import Helmet from 'react-helmet'
import { getActivatedRoute, getMatchingRoute } from 'gatsby-plugin-advanced-pages'
import { useSiteMetadata } from '../../hooks'
import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'
import Separator from '../Separator'
import * as styles from './index.module.css'
import avatar from '../../assets/img/avatar/avatar.png'
import avatarAlt from '../../assets/img/avatar/avatar-smile.png'

export default ({ children, title = null, description = null }) => {
  const site = useSiteMetadata()
  const route = getActivatedRoute() || getMatchingRoute('/404')

  title = title ? `${title} — ${site.title}` : site.title
  description = description || site.description

  return (
    <div className='flex'>
      <Helmet>
        <html lang='en' />
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
        <body className='font-body antialiased leading-normal text-base text-typo' />
      </Helmet>
      <div className='w-1/12 h-screen'>
        <header className='fixed w-inherit h-inherit bg-typo border-r-4 border-primary z-20'>
          <Author route={route} author={site.author} />
          <Contacts contacts={site.author.contacts} />
        </header>
      </div>
      <div className='w-2/12 h-screen'>
        <div className='fixed w-inherit h-inherit bg-accent z-10'>
          <Menu items={site.menu} />
        </div>
      </div>
      <main className={`${styles.main} w-9/12 min-h-screen pt-32 bg-secondary z-30 flex flex-col justify-center`}>
        {children}
        {route.path !== '/' && (
          <>
            <Separator size='4' spacing='0' />
            <footer className='px-20 py-16 bg-accent text-typo rfs:text-lg'>
              {site.copyright}
            </footer>
          </>
        )}
      </main>
    </div>
  )
}
