import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../hooks'
import { useTheme } from '../../providers/theme'
import { getPlatformHandle } from '../../commons/utils'
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
      title='Toggle Menu'
      onClick={e => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
      }}>
      <Icon name='menu' className='w-6' />
    </Button>
  )
}

function Header({ className }) {
  const { contacts } = useSiteMetadata()
  return (
    <header className={className}>
      <Helmet>
        <html lang='en' className='text-xs sm:text-base 2xl:text-lg' />
        <link rel='prefetch' href={avatarAlt} as='image' />
      </Helmet>
      <div className='absolute w-16 lg:w-32 top-0 right-0 mt-10 -mr-8 lg:-mr-16 text-center'>
        <ul>
          <li>
            <Link
              id='avatar'
              className='block rounded-full h-16 lg:h-32 bg-cover bg-center border-2 lg:border-4 border-primary transition-all'
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
            const { title, href, icon } = getPlatformHandle(type, to)
            return (
              <li key={i}>
                <Button size='mono' className='mb-4' to={href} external='app_contact' title={title}>
                  <Icon name={icon} className='w-6' />
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
