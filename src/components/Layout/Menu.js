import React from 'react'
import { useCurrentRoute, useSiteMetadata } from '../../hooks'
import { Link } from '..'

function Heading() {
  const { title } = useSiteMetadata()
  const { path } = useCurrentRoute()
  const Tag = path === '/' ? 'h1' : 'h2'
  return (
    <Tag className='text-2xl italic text-right mr-6 mb-6'>
      <Link to='home'>{title}</Link>
    </Tag>
  )
}

export default function Menu({ className }) {
  const { menu } = useSiteMetadata()
  return (
    <nav className={className}>
      <Heading />
      <ul>
        {menu.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
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
