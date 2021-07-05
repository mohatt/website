import React, { useContext } from 'react'
import { useSiteMetadata } from '../../hooks'
import { Link } from '..'
import { LayoutContext } from './Layout'

function MenuItem({ label, to, params, onClick }) {
  return (
    <li>
      <Link
        to={to}
        params={params}
        onClick={onClick}
        className='block font-display font-medium italic text-right mb-6 mr-6 hover:text-typo'
        activeClassName='text-typo active'
        partiallyActive={to !== 'home'}
        children={label}
      />
    </li>
  )
}

function Menu({ isHome, className }) {
  const { menu, title } = useSiteMetadata()
  const { setMenuOpen } = useContext(LayoutContext)
  const closeMenu = () => setMenuOpen(false)
  return (
    <nav className={className}>
      {isHome && <h1 className='hidden'>{title}</h1>}
      <ul>
        {menu.map((props, i) => <MenuItem key={i} onClick={closeMenu} {...props} />)}
      </ul>
    </nav>
  )
}

export default React.memo(Menu)
