import type { ComponentProps } from 'react'
import { site } from '@/constants'
import { NetworkHandle } from '@/util'

export interface ContactsProps extends Omit<ComponentProps<typeof NetworkHandle.Map>, 'data'> {
  homepage?: boolean
  phone?: boolean
}

export default function Contacts({ homepage, phone, ...props }: ContactsProps) {
  const contacts = [...site.contacts]
  if (homepage) {
    contacts.unshift(`homepage:${site.deployment.url}`)
  }
  if (phone) {
    contacts.unshift(`phone:${site.phone}`)
  }
  return <NetworkHandle.Map data={contacts} {...props} />
}
