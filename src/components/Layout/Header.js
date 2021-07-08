import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { PlatformHandle } from '../../commons/platforms'
import { useCurrentPath, useSiteMetadata } from '../../hooks'
import { useTheme } from '../../providers/theme'
import { Button, Icon, Link } from '..'
import { LayoutContext } from './Layout'
import avatarAlt from '../../images/avatar/avatar-smile.png'

function ThemeButton() {
  const { cycleTheme } = useTheme()
  return (
    <Button
      size='mono'
      className='my-4 lg:my-6'
      title='Change theme'
      onClick={e => {
        e.preventDefault()
        cycleTheme()
      }}>
      <Icon name='theme' className='w-6' />
    </Button>
  )
}

function MenuButton() {
  const { menuOpen, setMenuOpen } = useContext(LayoutContext)
  return (
    <Button
      size='mono'
      active={menuOpen}
      title='Toggle side menu'
      onClick={e => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
      }}>
      <Icon name='menu' className='w-6' />
    </Button>
  )
}

function Header({ className }) {
  const site = useSiteMetadata()
  const { realpath } = useCurrentPath()
  return (
    <header className={className}>
      <Helmet
        htmlAttributes={{ lang: 'en', class: 'text-xs sm:text-base 2xl:text-lg' }}
        meta={[
          { name: 'og:type', content: 'website' },
          { name: 'og:url', content: site.url + realpath },
          { name: 'twitter:card', content: 'summary_large_image' },
        ]}
        link={[
          { rel: 'prefetch', as: 'image', href: avatarAlt },
        ]}
      />
      <div className='absolute w-16 lg:w-32 top-0 right-0 mt-10 -mr-8 lg:-mr-16 text-center'>
        <ul>
          <li>
            <Link
              id='avatar'
              className='block rounded-full h-16 lg:h-32 bg-cover bg-center border-2 lg:border-4 border-primary transition-all'
              to='home'
              title={site.title}
            />
          </li>
          <li>
            <ThemeButton />
          </li>
          <li className='visible lg:invisible'>
            <MenuButton />
          </li>
        </ul>
      </div>
      <div className='absolute w-12 bottom-0 mb-6 right-0 -mr-6'>
        <ul>
          <PlatformHandle.Map data={site.contacts}>
            {({ title, href, Icon }) => (
              <li className='mb-4'>
                <Button size='mono' to={href} external='header_contact' title={title}>
                  <Icon className='w-6' />
                </Button>
              </li>
            )}
          </PlatformHandle.Map>
        </ul>
      </div>
    </header>
  )
}

export default React.memo(Header)
