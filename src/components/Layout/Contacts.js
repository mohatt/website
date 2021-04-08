import React from 'react'
import { useLayout } from './LayoutProvider'
import { getContactHref } from '../../commons'
import { Icon, Button } from '..'

export default function Contacts({ contacts }) {
  const { menuOpen, setMenuOpen, cycleTheme } = useLayout()
  return (
    <div id='contacts' className='absolute block w-12 bottom-0 right-0 -mr-6'>
      <ul>
        <li className='visible lg:invisible'>
          <Button
            mono
            active={menuOpen}
            className='w-12 h-12 mb-6'
            onClick={e => {
              e.preventDefault()
              setMenuOpen(!menuOpen)
            }}
          >
            <Icon name='menu' />
          </Button>
        </li>
        <li>
          <Button
            mono
            className='w-12 h-12 mb-6'
            onClick={e => {
              e.preventDefault()
              cycleTheme()
            }}
          >
            <Icon name='theme' />
          </Button>
        </li>
        {Object.keys(contacts).map((name) => (
          <li key={name}>
            <Button
              mono
              className='block w-12 h-12 mb-6'
              to={getContactHref(name, contacts[name])}
              external
              rel='noopener noreferrer'
              target='_blank'
            >
              <Icon name={name} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
