import React, { useRef, useState } from 'react'
import { useAnalyticsEffect, useCurrentLocation, useCurrentPath } from '../../hooks'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function useAnalyticsConfig() {
  const location = useCurrentLocation()
  const referrer = useRef()
  return useAnalyticsEffect(({ config }) => {
    config({
      page_path: location.pathname + location.search + location.hash,
      page_referrer: referrer.current || document.referrer
    })
    referrer.current = location.href
  }, [location.href])
}

export const LayoutContext = React.createContext()

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { path } = useCurrentPath()
  const isHome = path === '/'
  useAnalyticsConfig()
  return (
    <div className='flex flex-row'>
      <LayoutContext.Provider value={{ menuOpen, setMenuOpen }}>
        <div
          id='header'
          className='w-24 h-screen sticky top-0 flex-shrink-0 border-r-4 border-primary bg-typo text-primary z-20'>
          <Header className='h-full relative' />
        </div>
        <div
          id='menu'
          className={`${
            menuOpen ? 'w-64' : 'w-0'
          } lg:w-64 h-screen sticky top-0 overflow-hidden flex-shrink-0 flex flex-col justify-center bg-accent text-typo-dim text-shadow transition-box`}>
          <Menu isHome={isHome} className='w-64' />
        </div>
        <div
          id='main'
          className={`${
            menuOpen ? '-mr-64' : ''
          } lg:-mr-0 flex-grow flex flex-col bg-secondary text-typo-dim text-shadow transition-box`}>
          <main className='mt-32 flex-grow flex-shrink-0 flex flex-col justify-center'>
            {children}
          </main>
          {!isHome && <Footer className='flex-shrink-0' />}
        </div>
      </LayoutContext.Provider>
    </div>
  )
}
