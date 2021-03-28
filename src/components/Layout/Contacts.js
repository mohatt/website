import React from 'react'
import useAppState from '../../App'
import { getContactHref } from '../../commons'
import Icon from '../Icon'
import Button from '../Button'
import * as styles from './Contacts.module.css'

export default ({ contacts }) => {
  const { menuOpen, setMenuOpen, rotateTheme } = useAppState()
  return (
    <div className='absolute block w-12 bottom-0 right-0 -mr-6'>
      <ul>
        <li className='visible lg:invisible'>
          <Button
            mono
            active={menuOpen}
            color='accent'
            className={`${styles.contact} w-12 h-12 mb-6`}
            onClick={e => {
              e.preventDefault()
              setMenuOpen(!menuOpen)
            }}
            to='#'
          >
            <Icon name='menu' />
          </Button>
        </li>
        <li>
          <Button
            mono
            color='accent'
            className={`${styles.contact} w-12 h-12 mb-6`}
            onClick={e => {
              e.preventDefault()
              rotateTheme()
            }}
            to='#'
          >
            <Icon name='theme' />
          </Button>
        </li>
        {Object.keys(contacts).map((name) => (
          <li key={name}>
            <Button
              mono
              color='accent'
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
