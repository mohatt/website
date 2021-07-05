import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { generatePath, routeExists } from 'gatsby-plugin-advanced-pages'
import { useCurrentPath, useSiteMetadata } from '../../hooks'
import { Link } from '..'
import { LayoutContext } from './Layout'

function MenuItemSubs({ items, onClick, hashPath, isHashPath }) {
  const [activeHash, setActiveHash] = useState(null)

  useEffect(() => {
    const hashElms = items.map(i => i.hash && document.getElementById(i.hash)).filter(Boolean)
    if (!isHashPath || hashElms.length === 0) {
      setActiveHash(null)
      return
    }

    let busy = false
    function scrollListner() {
      if (!busy) {
        busy = true
        requestAnimationFrame(function () {
          const { innerHeight } = window
          // Minimum intersection ratio for the element to be considered active
          // 40% of the viewport height
          let max = innerHeight * 0.4
          let active = null
          hashElms.forEach(el => {
            const { top, height } = el.getBoundingClientRect()
            // Element current visible area
            const visible = top >= innerHeight ? 0 : (
              top >= 0
                ? Math.min(innerHeight - top, height)
                : Math.max(height + top, 0)
            )
            if (visible >= max) {
              max = visible
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
  }, [items, setActiveHash, isHashPath])

  return (
    <ul>
      {items.map(({ label, to, params, hash }, i) => (
        <li key={i}>
          <Link
            to={to || hashPath + '#' + hash}
            params={params}
            onClick={to || !hash || !isHashPath ? onClick : function (e) {
              document.getElementById(hash).scrollIntoView({ behavior: 'smooth' })
              onClick()
              e.preventDefault()
            }}
            className={classNames(
              'block font-display font-medium italic mb-6 text-right tag-open-close hover:text-primary',
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

  function InnerLink({ className }) {
    return (
      <Link
        to={to}
        params={params}
        onClick={onClick}
        className={classNames('block font-display font-medium italic mb-6 text-right hover:text-typo', className)}
        activeClassName='text-typo active'
        partiallyActive={to !== 'home'}
        children={label}
      />
    )
  }

  return (
    <li className='mr-6'>
      <InnerLink className={current ? 'tag-open' : 'tag-open-close'} />
      {current && (
        <>
          <MenuItemSubs items={items} hashPath={current} isHashPath={realpath === current} onClick={onClick} />
          <InnerLink className='tag-close' />
        </>
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
      <ul>
        {menu.map((props, i) => <MenuItem key={i} onClick={closeMenu} {...props} />)}
      </ul>
    </nav>
  )
}

export default React.memo(Menu)
