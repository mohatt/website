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
  const { menu, titleShort } = useSiteMetadata()
  const { setMenuOpen } = useContext(LayoutContext)
  const closeMenu = () => setMenuOpen(false)
  const Heading = isHome ? 'h1' : 'h2'
  return (
    <nav className={className}>
      <Heading className='text-2xl italic text-right mr-6 mb-6'>
        <Link to='home'>{titleShort}</Link>
      </Heading>
      <ul>
        {menu.map(props => <MenuItem key={props.to} onClick={closeMenu} {...props} />)}
      </ul>
    </nav>
  )
}

export default React.memo(Menu)
