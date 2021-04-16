import React from 'react'
import { useLayout } from '../../hooks'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function WithMenu({ menu, children }) {
  const { menuOpen } = useLayout()
  return (
    <>
      <div id='menu' className={`${menuOpen ? 'w-64' : 'w-0'} lg:w-64 overflow-hidden flex-shrink-0 flex flex-col justify-center bg-accent text-typo-dim text-shadow transition-box`}>
        {menu}
      </div>
      <div id='main' className={`${menuOpen ? '-mr-64' : ''} lg:-mr-0 flex-grow overflow-y-auto flex flex-col bg-secondary text-typo-dim text-shadow transition-box`}>
        {children}
      </div>
    </>
  )
}

export default function Layout({ children }) {
  return (
    <div className='h-screen flex flex-row overflow-hidden'>
      <div id='header' className='w-24 flex-shrink-0 border-r-4 border-primary bg-typo text-primary z-20'>
        <Header className='h-full relative' />
      </div>
      <WithMenu menu={<Menu className='w-64' />}>
        <main className='mt-32 flex-grow flex-shrink-0 flex flex-col justify-center'>
          {children}
        </main>
        <Footer className='flex-shrink-0' />
      </WithMenu>
    </div>
  )
}
