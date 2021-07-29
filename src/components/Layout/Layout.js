import React, { useReducer } from 'react'
import { usePath } from '../../hooks'
import Providers from '../../providers'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function menuStateReducer(state, action) {
  return action === 't' ? !state : false
}

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useReducer(menuStateReducer)
  const [path] = usePath()
  return (
    <div className='flex'>
      <div
        id='header'
        className='w-9 lg:w-[4.375rem] h-screen sticky top-0 flex-shrink-0 border-r-2 lg:border-r-4 bg-typo text-primary z-20'>
        <Header setMenuOpen={setMenuOpen} className='h-full relative' />
      </div>
      <div
        id='menu'
        className={`${menuOpen ? 'w-56' : 'w-0'} xl:w-56 3xl:w-64 h-screen sticky top-0 flex-shrink-0 overflow-x-hidden flex flex-col justify-center bg-accent text-typo-dim text-shadow transition-box`}>
        <Menu setMenuOpen={setMenuOpen} className='w-56 xl:w-auto' />
      </div>
      <div
        id='main'
        className='xl:-mr-0 flex-grow flex flex-col bg-secondary text-typo-dim text-shadow overflow-x-hidden'
        onClick={setMenuOpen}>
        <main className={`${menuOpen ? '-mr-56 ' : ''}mt-16 2xl:mt-24 flex-grow flex-shrink-0 flex flex-col justify-center transition-box`}>
          {children}
        </main>
        {path !== '/' && <Footer className='flex-shrink-0' />}
      </div>
    </div>
  )
}

Layout.Outer = Providers
