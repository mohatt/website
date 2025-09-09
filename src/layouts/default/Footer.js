import React from 'react'
import { site } from '../../constants'
import { Section, Link } from '../../components'
import { useSiteMetadata } from '../../hooks'

function Footer({ className }) {
  const { deployment } = useSiteMetadata()
  const {
    date,
    config: { sha },
  } = deployment
  return (
    <footer className={className}>
      <Section className='font-display' fill sep='pre' spacing={false}>
        <div className='flex'>
          <div className='flex-grow'>{site.copyright}</div>
          <div>
            <Link
              href={`https://github.com/mohatt/website/commit/${sha}`}
              title={`Build time: ${date}`}
              className='link opacity-75'
              linkId='deploy_sha'
              target='_blank'
            >
              {sha}
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  )
}

export default React.memo(Footer)
