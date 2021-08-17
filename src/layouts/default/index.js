import React, { useCallback } from 'react'
import { usePath } from '../../hooks'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

export default function DefaultLayout({ layout: { state: { menu }, dispatch }, children }) {
  const [path] = usePath()
  const closeMenu = useCallback(() => dispatch('menu', false), [])
  return (
    <div className='flex'>
      <div
        id='header'
        className='w-9 lg:w-[4.375rem] h-screen sticky top-0 flex-shrink-0 border-r-2 lg:border-r-4 bg-typo text-primary z-20'>
        <Header className='h-full relative' />
      </div>
      <div
        id='menu'
        className={`${menu ? 'w-56' : 'w-0'} xl:w-56 3xl:w-64 h-screen sticky top-0 flex-shrink-0 overflow-x-hidden flex flex-col justify-center bg-accent text-typo-dim text-shadow transition-box`}>
        <Menu closeMenu={closeMenu} className='w-56 xl:w-auto' />
      </div>
      <div
        id='main'
        className='xl:-mr-0 flex-grow flex flex-col bg-secondary text-typo-dim text-shadow overflow-x-hidden'
        onClick={closeMenu}>
        <main className={`${menu ? '-mr-56 ' : ''}mt-16 2xl:mt-24 flex-grow flex-shrink-0 flex flex-col justify-center transition-box`}>
          {children}
        </main>
        {path !== '/' && <Footer className='flex-shrink-0' />}
      </div>
    </div>
  )
}

DefaultLayout.id = 'default'
DefaultLayout.state = { menu: false }
