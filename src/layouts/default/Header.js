import React from 'react'
import { useLayout, useTheme } from '../../hooks'
import { Button, Icon, Link } from '../../components'
import { DocumentHead, Contacts } from '../partials'

function MenuButton() {
  const { state: { menu }, dispatch } = useLayout()
  return (
    <Button
      size='mono'
      title='Toggle side menu'
      active={menu}
      onClick={e => {
        e.preventDefault()
        dispatch('menu', !menu)
      }}>
      <Icon name='menu' className='w-6' />
    </Button>
  )
}

export function ColorThemeButton() {
  const cycle = useTheme()
  return (
    <Button
      size='mono'
      title='Change colors theme'
      onClick={e => {
        e.preventDefault()
        cycle('color')
      }}>
      <Icon name='theme' className='w-6' />
    </Button>
  )
}

export function EdgesThemeButton() {
  const cycle = useTheme()
  return (
    <Button
      size='mono'
      title='Change borders style'
      onClick={e => {
        e.preventDefault()
        cycle('edges')
      }}>
      <span className='icon w-6 h-6 rounded-full border-[.35rem]' />
    </Button>
  )
}

function Header({ className }) {
  return (
    <header className={className}>
      <DocumentHead />
      <div className='absolute w-16 lg:w-32 top-0 right-0 mt-10 -mr-8 lg:-mr-16 text-center'>
        <ul>
          <li className='mb-6'>
            <Link
              id='avatar'
              className='block rounded-full h-16 lg:h-32 bg-cover bg-center transition-all'
              to='home'
              title='Go to homepage'
            />
          </li>
          <li className='mb-4 xl:hidden'><MenuButton /></li>
          <li className='mb-4'><ColorThemeButton /></li>
          <li><EdgesThemeButton /></li>
        </ul>
      </div>
      <Contacts>
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
      </Contacts>
    </header>
  )
}

export default React.memo(Header)
