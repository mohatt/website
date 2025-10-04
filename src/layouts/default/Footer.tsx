import { memo } from 'react'
import { generatePath } from 'gatsby-plugin-advanced-pages'
import { site } from '@/constants'
import { Section, Link, Icon } from '@/components'

export interface FooterProps {
  className?: string
}

function Footer({ className }: FooterProps) {
  const {
    deployment: { sha, date },
    repository,
  } = site
  return (
    <footer className={className}>
      <Section className='font-display' fill sep='pre' spacing={false}>
        <div className='flex'>
          <div className='flex-grow'>
            <span>
              Brewed with{' '}
              <Link
                href='https://www.gatsbyjs.com'
                className='link'
                target='_blank'
                rel='noreferrer'
              >
                Gatsby
              </Link>{' '}
              &{' '}
            </span>
            <Icon name='coffee' className='w-6 h-6 -mt-0.5 align-top' />
          </div>
          <div className='opacity-75'>
            <Link
              href={`${repository}/commit/${sha}`}
              title={`Build time: ${date.toLocaleString()}`}
              className='link'
              linkId='deploy_sha'
              target='_blank'
              rel='noreferrer'
            >
              #{sha}
            </Link>
            <span className='mx-2'>•</span>
            <Link
              // Using a regular a tag to skip pre-rendering dashboard data
              href={generatePath('dashboard')}
              title='Open site dashboard'
              className='link'
              linkId='dashboard'
            >
              Dashboard
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  )
}

export default memo(Footer)
