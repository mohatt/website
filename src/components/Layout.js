import React from 'react'
import Helmet from 'react-helmet'
import { isActivatedRoute } from 'gatsby-plugin-advanced-pages'
import { useSiteMetadata } from '../hooks'
import { Header, Footer } from './layout'
import * as styles from './Layout.module.css'
import avatar from '../assets/img/avatar/avatar.png'
import avatarSmile from '../assets/img/avatar/avatar-smile.png'

const Layout = ({ children, title = null, description = null }) => {
  const { title: siteTitle, description: SiteDescription } = useSiteMetadata()

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
      <Header />
      <main className={`${styles.main} w-9/12 min-h-screen pt-32 bg-secondary z-30 flex flex-col justify-center`}>
        {children}
        {!isActivatedRoute('home') && <Footer />}
      </main>
    </div>
  )
}

export default Layout
