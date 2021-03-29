import React from 'react'
import { useLayout } from '../../state'
import { getContactHref } from '../../commons'
import { Icon, Button } from '..'
import * as styles from './Contacts.module.css'

export default function Contacts({ contacts }) {
  const { menuOpen, setMenuOpen, rotateTheme } = useLayout()
  return (
    <div className='absolute block w-12 bottom-0 right-0 -mr-6'>
      <ul>
        <li className='visible lg:invisible'>
          <Button
            mono
            active={menuOpen}
            className={`${styles.contact} w-12 h-12 mb-6`}
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
            className={`${styles.contact} w-12 h-12 mb-6`}
            onClick={e => {
              e.preventDefault()
              rotateTheme()
            }}
          >
            <Icon name='theme' />
          </Button>
        </li>
        {Object.keys(contacts).map((name) => (
          <li key={name}>
            <Button
              mono
              className={`${styles.contact} block w-12 h-12 mb-6`}
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
