import React from 'react'
import { useSiteMetadata } from '../../hooks'
import { Link } from '..'

const Menu = React.memo(props => {
  const { menu } = useSiteMetadata()
  return (
    <nav {...props}>
      <ul>
        {menu.map(({ to, label }) => (
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
})

export default Menu
