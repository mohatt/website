import type { ComponentProps } from 'react'
import { Helmet } from 'react-helmet-async'
import { site } from '../constants'
import { NetworkHandle } from '../util'
import { usePath } from '../hooks'
import avatarAlt from '../images/avatar/photo-nobg.webp'

export function DocumentHead() {
  const [path, realPath] = usePath()
  return (
    <>
      {path === '/' && <h1 className='hidden'>{site.title}</h1>}
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: site.deployment.url + realPath },
          { name: 'twitter:card', content: 'summary_large_image' },
        ]}
        link={[{ rel: 'prefetch', as: 'image', href: avatarAlt }]}
      />
    </>
  )
}

export interface ContactsProps extends Omit<ComponentProps<typeof NetworkHandle.Map>, 'data'> {
  homepage?: boolean
  phone?: boolean
}

export function Contacts({ homepage, phone, ...props }: ContactsProps) {
  const contacts = [...site.contacts]
  if (homepage) {
    contacts.unshift('homepage:' + site.deployment.url)
  }
  if (phone) {
    contacts.unshift('phone:' + site.phone)
  }
  return <NetworkHandle.Map data={contacts} {...props} />
}
