import { useCallback, ReactNode } from 'react'
import { useLayoutState, usePath } from '../../hooks'
import { site } from '../../constants'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout = function DefaultLayout({ children }: DefaultLayoutProps) {
  const {
    state: { menu },
    dispatch,
  } = useLayoutState<'default'>()
  const [path] = usePath()
  const closeMenu = useCallback(
    () => dispatch({ type: 'SET', payload: { menu: false } }),
    [dispatch],
  )
  return (
    <div className='flex'>
      <div
        id='header'
        className='w-9 lg:w-[4.375rem] flex-shrink-0 border-r-2 lg:border-r-4 bg-typo text-primary z-20'
      >
        <Header className='h-full relative'>
          {path === '/' && <h1 className='hidden'>{site.title}</h1>}
        </Header>
      </div>
      <div
        id='menu'
        className={`${menu ? 'w-56' : 'w-0'} xl:w-56 3xl:w-64 flex-shrink-0 bg-accent text-typo-dim text-shadow transition-box`}
      >
        <div className='h-screen sticky top-0 flex flex-col justify-center overflow-x-hidden overflow-y-auto'>
          <Menu closeMenu={closeMenu} className='py-16 w-56 xl:w-auto' />
        </div>
      </div>
      <div
        id='main'
        className='xl:-mr-0 flex-grow flex flex-col bg-secondary text-typo-dim text-shadow overflow-x-hidden'
        onClick={closeMenu}
      >
        <main
          className={`${menu ? '-mr-56 ' : ''}mt-16 2xl:mt-24 flex-grow flex-shrink-0 flex flex-col justify-center transition-box`}
        >
          {children}
        </main>
        {path !== '/' && <Footer className='flex-shrink-0' />}
      </div>
    </div>
  )
}

export default DefaultLayout
