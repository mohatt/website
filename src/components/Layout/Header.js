import React from 'react'
import { Helmet } from 'react-helmet'
import { site } from '../../constants'
import { usePath, useSiteMetadata, useTheme } from '../../hooks'
import { PlatformHandle } from '../../util'
import { Button, Icon, Link } from '..'
import avatarAlt from '../../images/avatar/avatar-smile.png'

function ThemeButtons() {
  const cycle = useTheme()
  return (
    <>
      <li className='mb-4'>
        <Button
          size='mono'
          title='Change colors theme'
          onClick={e => {
            e.preventDefault()
            cycle('color')
          }}>
          <Icon name='theme' className='w-6' />
        </Button>
      </li>
      <li>
        <Button
          size='mono'
          title='Change borders style'
          onClick={e => {
            e.preventDefault()
            cycle('edges')
          }}>
          <span className='icon w-6 h-6 rounded-full border-[.35rem]' />
        </Button>
      </li>
    </>
  )
}

function MenuButton({ setMenuOpen }) {
  return (
    <Button
      size='mono'
      title='Toggle side menu'
      onClick={e => {
        e.preventDefault()
        setMenuOpen('t')
      }}>
      <Icon name='menu' className='w-6' />
    </Button>
  )
}

function Header({ setMenuOpen, className }) {
  const { deployment } = useSiteMetadata()
  const [path, realPath] = usePath()

  return (
    <header className={className}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'og:type', content: 'website' },
          { name: 'og:url', content: deployment.config.url + realPath },
          { name: 'twitter:card', content: 'summary_large_image' },
        ]}
        link={[
          { rel: 'prefetch', as: 'image', href: avatarAlt },
        ]}
      />
      <div className='absolute w-16 lg:w-32 top-0 right-0 mt-10 -mr-8 lg:-mr-16 text-center'>
        <ul>
          <li className='mb-6'>
            <Link
              id='avatar'
              className='block rounded-full h-16 lg:h-32 bg-cover bg-center transition-all'
              to='home'
              title={site.title}
            />
            {path === '/' && <h1 className='hidden'>{site.title}</h1>}
          </li>
          <li className='mb-4 xl:hidden'>
            <MenuButton setMenuOpen={setMenuOpen} />
          </li>
          <ThemeButtons />
        </ul>
      </div>
      <PlatformHandle.Map data={site.contacts}>
        {items => (
          <div className='absolute w-12 bottom-0 mb-6 right-0 -mr-6'>
            <ul>{items}</ul>
          </div>
        )}
        {({ title, href, Icon }) => (
          <li className='mb-4'>
            <Button size='mono' to={href} external='header_contact' title={title}>
              <Icon className='w-6' />
            </Button>
          </li>
        )}
      </PlatformHandle.Map>
    </header>
  )
}

export default React.memo(Header)
