import React from 'react'
import Helmet from 'react-helmet'
import useRoute from '../../hooks/current-route'
import useMetadata from '../../hooks/site-metadata'
import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'
import Separator from '../Separator'
import * as styles from './index.module.css'
import avatar from '../../assets/img/avatar/avatar.png'
import avatarAlt from '../../assets/img/avatar/avatar-smile.png'

export default ({ children, title = null, pretitle = null, description = null }) => {
  const site = useMetadata()
  const { path } = useRoute()

  pretitle = pretitle || `require('.${path === '/' ? '/index' : path}.md');`
  title = title ? `${title} — ${site.title}` : site.title
  description = description || site.description

  return (
    <div className='flex'>
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
      <div className='w-1/12 h-screen'>
        <header className='fixed w-inherit h-inherit border-r-4 border-primary bg-typo text-primary z-20'>
          <Author author={site.author} />
          <Contacts contacts={site.author.contacts} />
        </header>
      </div>
      <div className='w-2/12 h-screen'>
        <div className='fixed w-inherit h-inherit bg-accent text-typo-dim text-shadow z-10'>
          <Menu items={site.menu} />
        </div>
      </div>
      <div className={`w-9/12 min-h-screen pt-32 flex flex-col justify-center bg-secondary text-typo-dim text-shadow z-30 ${styles.main}`}>
        <main>
          <div className='px-20 font-display italic'>
            {pretitle}
          </div>
          {children}
        </main>
        {path !== '/' && (
          <footer>
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
