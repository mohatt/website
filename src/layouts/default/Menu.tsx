import { memo, useEffect, useRef, useState, MouseEvent } from 'react'
import { generatePath, routeExists } from 'gatsby-plugin-advanced-pages'
import { menu, $window, $document, SiteMenuSubItem } from '@/constants'
import { cx } from '@/util'
import { usePath } from '@/hooks'
import { Link } from '@/components'

interface SubMenuProps {
  items: SiteMenuSubItem[]
  hashPath: string
  currentPath: string
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
}

function SubMenu({ items, hashPath, currentPath, onClick }: SubMenuProps) {
  const hashTargets = useRef<HTMLElement[]>([])
  const [activeHash, setActiveHash] = useState<string>(null)

  useEffect(() => {
    hashTargets.current = items.map(({ hash }) => hash && $document.getElementById(hash))
    const targets = hashTargets.current.filter(Boolean)
    if (targets.length === 0) {
      setActiveHash(null)
      return undefined
    }

    // Minimum intersecting area of the element to be considered active
    const THRESHOLD = 0.5 // 50%
    let busy = false
    const listener = () => {
      if (busy) return
      busy = true
      requestAnimationFrame(() => {
        const { innerHeight } = $window

        // Collect candidates that CLEAR the threshold
        const candidates = []
        for (const target of targets) {
          const rect = target.getBoundingClientRect()
          const visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0))
          const denom = Math.max(1, Math.min(rect.height, innerHeight))
          const ratio = visible / denom

          if (ratio >= THRESHOLD) {
            // Prefer the one closest to viewport center when ratios tie
            const centerDist = Math.abs(rect.top + rect.height / 2 - innerHeight / 2)
            candidates.push({ id: target.id, ratio, centerDist })
          }
        }

        if (candidates.length === 0) {
          // Clear when nothing meets the threshold
          setActiveHash(null)
        } else {
          // Pick the highest ratio, then closest to center
          candidates.sort((a, b) => b.ratio - a.ratio || a.centerDist - b.centerDist)
          setActiveHash(candidates[0].id)
        }

        busy = false
      })
    }

    listener()
    $window.addEventListener('scroll', listener, { passive: true })
    return () => {
      $window.removeEventListener('scroll', listener)
    }
  }, [items, currentPath])

  return (
    <ul className='mr-2'>
      {items.map(({ label, to, href, params, linkId, hash }, i) => (
        <li key={i}>
          <Link
            onClick={
              !hash || currentPath !== hashPath
                ? onClick
                : (e) => {
                    onClick(e)
                    if (hashTargets.current[i]) {
                      hashTargets.current[i].scrollIntoView({ behavior: 'smooth', block: 'start' })
                      e.preventDefault()
                    }
                  }
            }
            className={cx(
              'block mb-8 sm:mb-6 hover:text-primary',
              hash && hash === activeHash && 'text-primary',
            )}
            children={label}
            {...(href
              ? { href, linkId }
              : {
                  to: to || hashPath + '#' + hash,
                  params,
                  activeClassName: 'text-primary',
                  partiallyActive: true,
                })}
          />
        </li>
      ))}
    </ul>
  )
}

export interface MenuProps {
  closeMenu: (e: MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

function Menu({ closeMenu, className }: MenuProps) {
  const [currentPath] = usePath()
  return (
    <nav className={className}>
      <ul className='font-display font-medium italic text-right mr-6'>
        {menu.map(({ label, to, href, params, linkId, items }, i) => {
          let activePath = null
          if (to && items?.length) {
            const toPath = routeExists(to) ? generatePath(to, params, null, true) : to
            activePath = currentPath.startsWith(toPath) ? toPath : null
          }

          return (
            <li key={i}>
              <Link
                onClick={closeMenu}
                className='block mb-8 sm:mb-6 hover:text-typo'
                children={label}
                {...(href
                  ? { href, linkId }
                  : {
                      to,
                      params,
                      activeClassName: 'text-typo active',
                      partiallyActive: to !== 'home',
                    })}
              />
              {activePath && (
                <SubMenu
                  items={items}
                  hashPath={activePath}
                  currentPath={currentPath}
                  onClick={closeMenu}
                />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default memo(Menu)
