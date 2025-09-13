import { Button, Icon } from '../../components'
import { DocumentHead } from '../partials'

export default function PrintLayout({ layout: { setPrintLayout, isEnforced }, children }) {
  return (
    <div className='max-w-[8.5in] mx-auto shadow-2xl print:shadow-none'>
      <div id='header' className='fixed top-0 bottom-0 w-12 border-r-2 bg-typo text-primary'>
        <DocumentHead />
        {isEnforced && (
          <div className='absolute w-16 top-0 right-0 mt-6 -mr-8 text-center'>
            <ul>
              <li className='mb-4 print:hidden'>
                <Button
                  size='mono'
                  onClick={() => setPrintLayout(false)}
                  title='Exit print preview'
                >
                  <Icon name='back' className='w-5' />
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <main
        id='main'
        className='ml-12 flex flex-col justify-center bg-secondary text-typo text-shadow'
      >
        {children}
      </main>
    </div>
  )
}

PrintLayout.id = 'print'
