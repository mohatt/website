import React from 'react'
import { getContactHref } from '../../../utils'
import Icon from '../../Icon'
import Button from '../../Button'
import * as styles from './Contacts.module.css'

const Contacts = ({ contacts }) => (
  <div className='absolute block w-12 bottom-0 right-0 -mr-6'>
    <ul>
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

export default Contacts
