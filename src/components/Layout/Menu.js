import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { generatePath, routeExists } from 'gatsby-plugin-advanced-pages'
import { site, $window, $document } from '../../constants'
import { usePath } from '../../hooks'
import { Link } from '..'

function SubMenu({ items, hashPath, currentPath, onClick }) {
  const hashTargets = useRef([])
  const [activeHash, setActiveHash] = useState(null)

  useEffect(() => {
    hashTargets.current = items.map(i => i.hash && $document.getElementById(i.hash))
    const targets = hashTargets.current.filter(Boolean)
    if (targets.length === 0) {
      setActiveHash(null)
      return
    }

    let busy = false
    const listener = () => {
      if (!busy) {
        busy = true
        requestAnimationFrame(() => {
          const { innerHeight } = $window
          // Minimum intersecting area of the element to be considered active (40% vh)
          let max = innerHeight * 0.4
          setActiveHash(targets.reduce((acc, target) => {
            const { top, height } = target.getBoundingClientRect()
            const intersect = Math.min(height, height + top, innerHeight - top)
            if (intersect >= max) {
              max = intersect
              return target.id
            }
            return acc
          }, null))
          busy = false
        })
      }
    }

    listener()
    $window.addEventListener('scroll', listener, { passive: true })
    return () => $window.removeEventListener('scroll', listener)
  }, [items, currentPath])

  return (
    <ul className='mr-2'>
      {items.map(({ label, to, params, external, hash }, i) => (
        <li key={i}>
          <Link
            to={to || hashPath + '#' + hash}
            onClick={to || currentPath !== hashPath ? onClick : e => {
              onClick(e)
              if (hashTargets.current[i]) {
                hashTargets.current[i].scrollIntoView({ behavior: 'smooth', block: 'start' })
                e.preventDefault()
              }
            }}
            className={classNames('block mb-8 sm:mb-6 hover:text-primary', hash && hash === activeHash && 'text-primary')}
            children={label}
            {...external ? { external } : {
              params: params,
              activeClassName: 'text-primary',
              partiallyActive: true,
            }}
          />
        </li>
      ))}
    </ul>
  )
}

function Menu({ setMenuOpen, className }) {
  const [currentPath] = usePath()
  return (
    <nav className={className}>
      <ul className='font-display font-medium italic text-right mr-6'>
        {site.menu.map(({ label, to, params, external, items }, i) => {
          let isActive = null
          if (items && items.length) {
            const href = routeExists(to)
              ? generatePath(to, params, null, true)
              : to
            isActive = currentPath.startsWith(href) ? href : null
          }

          return (
            <li key={i}>
              <Link
                to={to}
                onClick={setMenuOpen}
                className='block mb-8 sm:mb-6 hover:text-typo'
                children={label}
                {...external ? { external } : {
                  params: params,
                  activeClassName: 'text-typo active',
                  partiallyActive: to !== 'home',
                }}
              />
              {isActive && (
                <SubMenu items={items} hashPath={isActive} currentPath={currentPath} onClick={setMenuOpen} />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default React.memo(Menu)
