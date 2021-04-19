import React, { useContext } from 'react'
import { useCurrentRoute, useSiteMetadata } from '../../hooks'
import { Link } from '..'
import { LayoutContext } from './Layout'

export default function Menu({ className }) {
  const { menu, title } = useSiteMetadata()
  const { path } = useCurrentRoute()
  const { setMenuOpen } = useContext(LayoutContext)
  const Heading = path === '/' ? 'h1' : 'h2'
  return (
    <nav className={className}>
      <Heading className='text-2xl italic text-right mr-6 mb-6'>
        <Link to='home'>{title}</Link>
      </Heading>
      <ul>
        {menu.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              onClick={() => setMenuOpen(false)}
              className='block font-display font-medium italic text-right mb-6 mr-6 hover:text-typo'
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
