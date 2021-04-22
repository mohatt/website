import React, { useContext } from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata, useTheme } from '../../hooks'
import { SOCIAL_HANDLES } from '../../commons/constants'
import { Button, Icon, Link } from '..'
import { LayoutContext } from './Layout'
import avatar from '../../images/avatar/avatar.png'
import avatarAlt from '../../images/avatar/avatar-smile.png'

function ThemeButton() {
  const { cycleTheme } = useTheme()
  return (
    <Button
      mono
      className='w-12 h-12 mt-7 mb-6'
      title='Change theme'
      onClick={e => {
        e.preventDefault()
        cycleTheme()
      }}>
      <Icon name='theme' />
    </Button>
  )
}

function MenuButton() {
  const { menuOpen, setMenuOpen } = useContext(LayoutContext)
  return (
    <Button
      mono
      active={menuOpen}
      className='w-12 h-12'
      title='Toggle Menu'
      onClick={e => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
      }}>
      <Icon name='menu' />
    </Button>
  )
}

function Header({ className }) {
  const { contacts } = useSiteMetadata()
  return (
    <header className={className}>
      <Helmet>
        <html lang='en' className='text-base xl:text-lg' />
        <link rel='preload' href={avatar} as='image' />
        <link rel='preload' href={avatarAlt} as='image' />
      </Helmet>
      <div className='absolute w-32 top-0 right-0 mt-10 -mr-16 text-center'>
        <ul>
          <li>
            <Link
              id='avatar'
              className='block rounded-full h-32 bg-cover bg-center border-4 border-primary transition-all'
              to='home'
              title='Home'
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
      <div className='absolute w-12 bottom-0 right-0 -mr-6'>
        <ul>
          {contacts.map(({ type, to }, i) => {
            const { title, href, icon } = SOCIAL_HANDLES[type]
            return (
              <li key={i}>
                <Button mono className='w-12 h-12 mb-6' to={href(to)} external title={title}>
                  <Icon name={icon} />
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}

export default React.memo(Header)
