import React from 'react'
import { Helmet } from 'react-helmet-async'
import { site } from '../constants'
import { NetworkHandle } from '../util'
import { usePath, useSiteMetadata } from '../hooks'
import avatarAlt from '../images/avatar/avatar-smile.png'

export function DocumentHead() {
  const { deployment } = useSiteMetadata()
  const [path, realPath] = usePath()
  return(
    <>
      {path === '/' && <h1 className='hidden'>{site.title}</h1>}
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'og:type', content: 'website' },
          { name: 'og:url', content: deployment.config.url + realPath },
          { name: 'twitter:card', content: 'summary_large_image' },
        ]}
        link={[
          { rel: 'prefetch', as: 'image', href: avatarAlt },
        ]}
      />
    </>
  )
}

export function Contacts({ homepage, phone, ...props }) {
  const { deployment } = useSiteMetadata()
  const contacts = site.contacts.slice()
  if (homepage) {
    contacts.unshift('homepage:' + deployment.config.url)
  }
  if (phone) {
    contacts.unshift('phone:' + site.phone)
  }
  return (
    <NetworkHandle.Map data={contacts} {...props} />
  )
}
