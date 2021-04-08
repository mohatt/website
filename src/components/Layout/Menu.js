import React from 'react'
import { Link } from '..'

export default function Menu({ items, className }) {
  return (
    <nav className={className}>
      <ul>
        {items.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className='block font-display font-medium italic text-right pb-6 pr-6 hover:text-typo'
              activeClassName='text-typo active'
              partiallyActive={to !== 'home'}
              children={label}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
