import React from 'react'
import { Link } from '..'
import * as styles from './Menu.module.css'

export default function Menu({ items, className }) {
  return (
    <nav className={className}>
      <ul>
        {items.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`block font-display font-medium italic text-right pb-6 pr-6 hover:text-typo ${styles.item}`}
              activeClassName={`text-typo ${styles.active}`}
              partiallyActive={to !== 'home'}
              children={label}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
