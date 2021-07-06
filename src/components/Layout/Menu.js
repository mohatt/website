import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { generatePath, routeExists } from 'gatsby-plugin-advanced-pages'
import { useCurrentPath, useSiteMetadata } from '../../hooks'
import { Link } from '..'
import { LayoutContext } from './Layout'

function MenuItemSubs({ items, onClick, hashPath, currentPath }) {
  const [activeHash, setActiveHash] = useState(null)

  useEffect(() => {
    const hashElms = items.map(i => i.hash && document.getElementById(i.hash)).filter(Boolean)
    if (hashElms.length === 0) {
      setActiveHash(null)
      return
    }

    let busy = false
    function scrollListner() {
      if (!busy) {
        busy = true
        requestAnimationFrame(function () {
          const { innerHeight } = window
          // Minimum intersection area for the element to be considered active
          // 40% of the viewport height
          let max = innerHeight * 0.4
          let active = null
          hashElms.forEach(el => {
            const { top, height } = el.getBoundingClientRect()
            const intersect = Math.min(height, height + top, innerHeight - top)
            if (intersect >= max) {
              max = intersect
              active = el.id
            }
          })

          setActiveHash(active)
          busy = false
        })
      }
    }

    scrollListner()
    window.addEventListener('scroll', scrollListner)
    return function () {
      window.removeEventListener('scroll', scrollListner)
    }
  }, [items, setActiveHash, currentPath])

  return (
    <ul>
      {items.map(({ label, to, params, hash }, i) => (
        <li key={i}>
          <Link
            to={to || hashPath + '#' + hash}
            params={params}
            onClick={to || !hash || currentPath !== hashPath ? onClick : function (e) {
              document.getElementById(hash).scrollIntoView({ behavior: 'smooth' })
              onClick(e)
              e.preventDefault()
            }}
            className={classNames(
              'block mb-8 sm:mb-6 tag-open-close hover:text-primary',
              hash && hash === activeHash && 'text-primary active'
            )}
            activeClassName='text-primary active'
            children={label}
          />
        </li>
      ))}
    </ul>
  )
}

function MenuItem({ label, to, params, items, onClick }) {
  const { realpath } = useCurrentPath()
  let current = null
  if (items) {
    const href = routeExists(to)
      ? generatePath(to, params)
      : to
    current = realpath.startsWith(href) ? href : null
  }

  return (
    <li>
      <Link
        to={to}
        params={params}
        onClick={onClick}
        className='block mb-8 sm:mb-6 tag-open-close hover:text-typo'
        activeClassName='text-typo active'
        partiallyActive={to !== 'home'}
        children={label}
      />
      {current && (
        <MenuItemSubs items={items} hashPath={current} currentPath={realpath} onClick={onClick} />
      )}
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
      <ul className='font-display font-medium italic text-right mr-6'>
        {menu.map((props, i) => <MenuItem key={i} onClick={closeMenu} {...props} />)}
      </ul>
    </nav>
  )
}

export default React.memo(Menu)
