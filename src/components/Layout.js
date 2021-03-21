import React from 'react'
import Helmet from 'react-helmet'
import { getActivatedRoute, getRoute } from 'gatsby-plugin-advanced-pages'
import { useSiteMetadata } from '../hooks'
import { Author, Contacts, Menu } from './layout'
import Separator from './Separator'
import * as styles from './Layout.module.css'
import avatar from '../assets/img/avatar/avatar.png'
import avatarSmile from '../assets/img/avatar/avatar-smile.png'

export default ({ children, title = null, description = null }) => {
  const { title: siteTitle, description: SiteDescription, menu, author, copyright } = useSiteMetadata()
  const route = getActivatedRoute() || getRoute('error.404')

  title = title ? `${title} — ${siteTitle}` : siteTitle
  description = description || SiteDescription

  return (
    <div className='flex'>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:type' content='website' />
        <meta name='og:site_name' content={siteTitle} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content={description} />
        <link rel='preload' href={avatar} as='image' />
        <link rel='preload' href={avatarSmile} as='image' />
        <body className='font-body antialiased leading-normal text-base text-typo' />
      </Helmet>
      <div className='w-1/12 h-screen'>
        <header className='fixed w-inherit h-inherit bg-typo border-r-4 border-primary z-20'>
          <Author route={route} author={author} />
          <Contacts contacts={author.contacts} />
        </header>
      </div>
      <div className='w-2/12 h-screen'>
        <div className='fixed w-inherit h-inherit bg-accent z-10'>
          <Menu items={menu} />
        </div>
      </div>
      <main className={`${styles.main} w-9/12 min-h-screen pt-32 bg-secondary z-30 flex flex-col justify-center`}>
        {children}
        {route.path !== '/' && (
          <>
            <Separator size='4' spacing='0' />
            <footer className='px-20 py-16 bg-accent text-typo rfs:text-lg'>
              {copyright}
            </footer>
          </>
        )}
      </main>
    </div>
  )
}
