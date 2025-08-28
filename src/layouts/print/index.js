import React from 'react'
import { Button, Icon } from '../../components'
import { DocumentHead } from '../partials'

export default function PrintLayout({ layout: { setPrintLayout, isEnforced }, children }) {
  return (
    <div className='flex max-w-[8.5in] mx-auto shadow-2xl print:shadow-none'>
      <header id='header' className='relative w-12 flex-shrink-0 border-r-2 bg-typo text-primary'>
        <DocumentHead />
        <div className='absolute w-16 top-0 right-0 mt-6 -mr-8 text-center'>
          <ul>
            <li className='mb-6'>
              <a id='avatar' className='block rounded-full h-16 bg-accent bg-cover bg-center' />
            </li>
            {isEnforced && (
              <li className='mb-4 print:hidden'>
                <Button
                  size='mono'
                  onClick={() => setPrintLayout(false)}
                  title='Exit print preview'
                >
                  <Icon name='back' className='w-5' />
                </Button>
              </li>
            )}
          </ul>
        </div>
      </header>
      <main
        id='main'
        className='pt-6 flex-grow flex flex-col justify-center bg-secondary text-typo-dim text-shadow'
      >
        {children}
      </main>
    </div>
  )
}

PrintLayout.id = 'print'
