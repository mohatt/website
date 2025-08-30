import React from 'react'
import { site } from '../../constants'
import { Section, Link } from '../../components'
import { useSiteMetadata } from '../../hooks'

function Footer({ className }) {
  const { deployment } = useSiteMetadata()
  return (
    <footer className={className}>
      <Section className='font-display' fill sep='pre' spacing={false}>
        <div className='flex'>
          <div className='flex-grow'>{site.copyright}</div>
          <div>
            <Link
              to={`https://github.com/mohatt/website/commit/${deployment.config.sha}`}
              title={`Build time: ${new Date(deployment.date).toLocaleString()}`}
              className='link opacity-75'
              external='deploy_sha'
            >
              {deployment.config.sha}
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  )
}

export default React.memo(Footer)
